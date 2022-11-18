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
