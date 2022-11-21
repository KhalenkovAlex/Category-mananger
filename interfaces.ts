import express from 'express';

export interface ICategory {
    id: string,
    slug: string,
    name: string,
    description: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}

export interface CategoryCreateParams {
    id: string,
    slug: string,
    name: string,
    description?: string,
    active: boolean,
}

export interface SearchParam {
    params: {
        param: string,
    }
}

type FaultResponse = { message: string };
type SuccessResponse = ICategory[];

export type TypedCategoryResponse = FaultResponse | SuccessResponse;
export type TypedResponse<T> = Omit<express.Response, 'json' | 'status'>
    & { json(data: T) : TypedResponse<T> }
    & { status(code: number): TypedResponse <T> };
