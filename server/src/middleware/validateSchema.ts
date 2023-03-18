import { NextFunction, Request, Response } from 'express';
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
