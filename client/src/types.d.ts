type ProjectCategory = {
    id: number;
    name: string;
    description: string;
    subcategoryList: ProjectSubcategoryList;
};

type ProjectSubcategory = {
    id: number;
    name: string;
    categoryId: number;
    description: string;
};
type ProjectCategoryList = ProjectCategory[];
type ProjectSubcategoryList = ProjectSubcategory[];

interface ProjectListFilters {
    categoriesId?: number[];
    subcategoriesId?: number[];
    visibleFinishedProject?: boolean;
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
    deadline: string;
    fundsRaised: string;
}

interface ProjectCard extends Project {
    countContributions: number;
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
enum ProjectDurationType {
    ExpirationDate = 'expiration_date',
    NumberDays = 'number_days',
}
