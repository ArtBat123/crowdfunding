type ProjectCategory = {
    id: number;
    name: string;
    description: string;
    subcategoryList: ProjectSubcategoryList;
};

type ProjectSubcategory = {
    id: number;
    name: string;
    description: string;
};
type ProjectCategoryList = ProjectCategory[];
type ProjectSubcategoryList = ProjectSubcategory[];
