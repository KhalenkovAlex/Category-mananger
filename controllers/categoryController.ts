import categoryService from '../services/categoryService';

import { Category } from '../models/models';

import { CategoryCreateParams } from '../interfaces';

interface CategoryPatchParams {
    id: string,
    slug?: string,
    name?: string,
    active?: boolean,
}

interface SearchParams {
    slug?: string,
    id?: string,
}

class CategoryController {
    async createCategory(req: { body: CategoryCreateParams }, res: any) {
        const params: CategoryCreateParams = req.body;
        try {
            if (!params.slug || !params.name || params.active === undefined) {
                return res.status(400).json({ message: 'Unable to create new Category, please check your data' });
            }
            const newCategory = await categoryService.createNew(params);

            return res.json({ newCategory });
        } catch (e) {
            return res.status(400).json({ message:`Request failed, reason: ${e} ` });
        }
    };

    async changeCategory(req: { body: CategoryPatchParams }, res: any) {
        const updatedCategoryData: CategoryPatchParams = req.body;
        const updatedCategory = await categoryService.changeCategory(updatedCategoryData);
        if (!updatedCategory) {
          return res.status(404).json({ message: 'Unable to update this Category, please check your data' });
        }

        return res.json({ message: 'Category was successfully updated' });
    };

    async deleteCategory(req: any, res: any) {
        const { id } = req.params;
        try {
            const { name } = await Category.findByPk(id);
            const result = await categoryService.delete(id, name);

            return res.json({ result });
        } catch (e) {
            return res.status(404).json({ message: 'Category with this id not found' })
        }
    };

    async getCategoriesByParams(req: { query: SearchParams }, res: any) {
        const searchParams = req.query;
        const category = await categoryService.getCategoriesByParams(searchParams);

        if (!category.length) {
            return res.status(404).json('Category by this params not found');
        }

        return res.json(category);
    };

    //1 Поиск категорий по полю name
            // По вхождение переданного текста без учета регистра
            // Умеет искать названия с ё через переданное е
            // Например категория “Мёд”. Запрос “?name=мед” найдет категорию
            // Мёд name?: string,
    //2 Все условия от поля name, но поиск идет по полю description description?: string,
    //3 Поиск по полю active
            // Поддерживаемые значения в параметрах: 0, false, 1, true.
            // Например active=1 или active=true отдаем только активные категории
            // active=0 или active=false отдаем только неактивные категории active?: string,
            // Все условия от поля name и description
            // Поиск осуществляется по полю name и description через “или”
            // Переданные фильтры по name и description должны игнорироваться
            // Например ?name=тапочки&description=текст&search=мед
            // При таком запросе фильтры name и description игнорируются search?:string,
    //4 Кол-во записей на страницу. Допустимы только цифры от 1-9
            // Например pageSize=1. В ответе увидим только одну запись,
            // т.е одну категорию.
            // При условии что есть записи в бд с переданными фильтрами
            // По умолчанию 2pageSize?: number,
            // Номер страницы. Допустимы только цифры
            // 0 и 1 являются первой страницей.
            // В ответ приходит кол-во записей с учетом pageSize
            // Например у нас в бд есть 4 записи(категории)
                // Запрос: “?page=1&pageSize=2”.
            // Ответ: первые две записи.
                // Запрос:  “?page=2&pageSize=2”.
            // Ответ: следующие две записи.page?: number,
    //5 Сортировка категорий
            // Принимает любое значение в виде названия поля модели категории
            // и необязательного символа направления сортировки
            // в виде - (дефис, тире).
            // Символ означает направление сортировки как DESC
            // Если переданного значения без учета “-” нет в модели категории,
            // то работает сортировка по умолчанию.
            // Например “?sort=active”  ASC сортировка по полю active
            // “?sort=-active” DESC сортировка по полю active
            // “?sort=-name” DESC сортировка по полю name
            // “?sort=-mike” игнорируем, так как нет такого поля в модели категории
            // По умолчанию sort=-createdDate sort?: string

    async getCategoriesByFilterParams(req: any, res: any) {
        console.log('########### req.body:', req.body);

        //1 Поиск категорий по полю name
        //2 Поиск идет по полю description по условиям name description?: string,
        //3 Поиск по полю active Все условия от поля name и description
        return res.json('dfhghdhg');
    }

}
export default new CategoryController();
