import { User } from '@prisma/client';
import { Request } from 'express';

export type AuthorizeRequest = (Request & { user: User }) | Request;
