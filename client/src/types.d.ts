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

interface ProjectQueryParams {
    subcategoryId?: string[];
    search?: string;
}
interface Project {
    id: number;
    title: string;
    subtitle: string;
    categoryId: number;
    subcategoryId: number;
    imageUrl: string;
    fundingGoal: number;
    projectDurationType: string;
    expirationDate?: Date;
    numberDays?: number;
    story?: string;
    createdDate: string;
    deadline: number;
}

interface ProjectReward {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    limit: number;
    projectId: number;
    description: string;
}
