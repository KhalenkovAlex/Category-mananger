import { ICategory } from './interfaces';
import express from 'express';

type FaultResponse = { message: string };
type SuccessResponse = ICategory[];

export type TypedCategoryResponse = FaultResponse | SuccessResponse;
export type TypedResponse<T> = Omit<express.Response, 'json' | 'status'> & { json(data: T) : TypedResponse<T> } & { status(code: number): TypedResponse <T> };
