/*!
 * Copyright (c) 2018 Chris O'Hara <cohara87@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function assertString(input) {
	const isString = typeof input === 'string' || input instanceof String;
	if (!isString) {
		let invalidType = typeof input;
		if (input === null) invalidType = 'null';
		else if (invalidType === 'object') invalidType = input.constructor.name;
		throw new TypeError(`Expected a string but received a ${invalidType}`);
	}
}
function merge(obj = {}, defaults) {
	for (const key in defaults) {
		if (typeof obj[key] === 'undefined') {
			obj[key] = defaults[key];
		}
	}
	return obj;
}
function isByteLength(str, options) {
	assertString(str);
	let min;
	let max;
	if (typeof options === 'object') {
		min = options.min || 0;
		max = options.max;
	} else {
		min = arguments[1];
		max = arguments[2];
	}
	const len = encodeURI(str).split(/%..|./).length - 1;
	return len >= min && (typeof max === 'undefined' || len <= max);
}
const default_fqdn_options = {
	require_tld: true,
	allow_underscores: false,
	allow_trailing_dot: false,
	allow_numeric_tld: false,
};
function isFQDN(str, options) {
	assertString(str);
	options = merge(options, default_fqdn_options);
	if (options.allow_trailing_dot && str[str.length - 1] === '.') {
		str = str.substring(0, str.length - 1);
	}
	const parts = str.split('.');
	const tld = parts[parts.length - 1];
	if (options.require_tld) {
		if (parts.length < 2) {
			return false;
		}
		if (!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
			return false;
		}
		if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/u.test(tld)) {
			return false;
		}
	}
	if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
		return false;
	}
	return parts.every((part) => {
		if (part.length > 63) {
			return false;
		}
		if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
			return false;
		}
		if (/[\uff01-\uff5e]/.test(part)) {
			return false;
		}
		if (/^-|-$/.test(part)) {
			return false;
		}
		if (!options.allow_underscores && /_/.test(part)) {
			return false;
		}
		return true;
	});
}
const ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const ipv6Block = /^[0-9A-F]{1,4}$/i;
function isIP(str, version = '') {
	assertString(str);
	version = String(version);
	if (!version) {
		return isIP(str, 4) || isIP(str, 6);
	} else if (version === '4') {
		if (!ipv4Maybe.test(str)) {
			return false;
		}
		const parts = str.split('.').sort((a, b) => a - b);
		return parts[3] <= 255;
	} else if (version === '6') {
		let addressAndZone = [str];
		if (str.includes('%')) {
			addressAndZone = str.split('%');
			if (addressAndZone.length !== 2) {
				return false;
			}
			if (!addressAndZone[0].includes(':')) {
				return false;
			}
			if (addressAndZone[1] === '') {
				return false;
			}
		}
		const blocks = addressAndZone[0].split(':');
		let foundOmissionBlock = false;
		const foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
		const expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
		if (blocks.length > expectedNumberOfBlocks) {
			return false;
		}
		if (str === '::') {
			return true;
		} else if (str.substr(0, 2) === '::') {
			blocks.shift();
			blocks.shift();
			foundOmissionBlock = true;
		} else if (str.substr(str.length - 2) === '::') {
			blocks.pop();
			blocks.pop();
			foundOmissionBlock = true;
		}
		for (let i = 0; i < blocks.length; ++i) {
			if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
				if (foundOmissionBlock) {
					return false;
				}
				foundOmissionBlock = true;
			} else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
				// it has been checked before that the last, block is a valid IPv4 address
			} else if (!ipv6Block.test(blocks[i])) {
				return false;
			}
		}
		if (foundOmissionBlock) {
			return blocks.length >= 1;
		}
		return blocks.length === expectedNumberOfBlocks;
	}
	return false;
}
const default_email_options = {
	allow_display_name: false,
	require_display_name: false,
	allow_utf8_local_part: true,
	require_tld: true,
	blacklisted_chars: '',
	ignore_max_length: false,
};
/* eslint-disable max-len */
/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape*/
const splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)<(.+)>$/i;
const emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
const gmailUserPart = /^[a-z\d]+$/;
const quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 =
	/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const defaultMaxEmailLength = 254;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */
/* eslint-enable no-useless-escape*/
function validateDisplayName(display_name) {
	const trim_quotes = display_name.match(/^"(.+)"$/i);
	const display_name_without_quotes = trim_quotes ? trim_quotes[1] : display_name;
	if (!display_name_without_quotes.trim()) {
		return false;
	}
	const contains_illegal = /.";<>]/.test(display_name_without_quotes);
	if (contains_illegal) {
		if (!trim_quotes) {
			return false;
		}
		const all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
		if (!all_start_with_back_slash) {
			return false;
		}
	}
	return true;
}
function isEmail(str, options) {
	assertString(str);
	options = merge(options, default_email_options);
	if (options.require_display_name || options.allow_display_name) {
		const display_email = str.match(splitNameAddress);
		if (display_email) {
			let display_name;
			if (display_name.endsWith(' ')) {
				display_name = display_name.substr(0, display_name.length - 1);
			}
			if (!validateDisplayName(display_name)) {
				return false;
			}
		} else if (options.require_display_name) {
			return false;
		}
	}
	if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
		return false;
	}
	const parts = str.split('@');
	const domain = parts.pop();
	let user = parts.join('@');
	const lower_domain = domain.toLowerCase();
	if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
		user = user.toLowerCase();
		const username = user.split('+')[0];
		if (!isByteLength(username.replace('.', ''), { min: 6, max: 30 })) {
			return false;
		}
		const user_parts = username.split('.');
		for (let i = 0; i < user_parts.length; i++) {
			if (!gmailUserPart.test(user_parts[i])) {
				return false;
			}
		}
	}
	if (options.ignore_max_length === false && (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 }))) {
		return false;
	}
	if (!isFQDN(domain, { require_tld: options.require_tld })) {
		if (!options.allow_ip_domain) {
			return false;
		}
		if (!isIP(domain)) {
			if (!domain.startsWith('[') || !domain.endsWith(']')) {
				return false;
			}
			let noBracketdomain = domain.substr(1, domain.length - 2);
			if (noBracketdomain.length === 0 || !isIP(noBracketdomain)) {
				return false;
			}
		}
	}
	if (user[0] === '"') {
		user = user.slice(1, user.length - 1);
		return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
	}
	const pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
	const user_parts = user.split('.');
	for (let i = 0; i < user_parts.length; i++) {
		if (!pattern.test(user_parts[i])) {
			return false;
		}
	}
	if (options.blacklisted_chars) {
		if (user.search(new RegExp(`[${options.blacklisted_chars}]+`, 'g')) !== -1) return false;
	}
	return true;
}

export default {
	assertString,
	merge,
	isByteLength,
	isEmail,
	isIP,
	isFQDN,
};
