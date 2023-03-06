import { NextFunction } from 'connect';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';

export function validateSchema(
	req: Request & { status?: number },
	res: Response,
	next: NextFunction
) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.json(errors.array()).status(req.status || 400);
	next();
}
