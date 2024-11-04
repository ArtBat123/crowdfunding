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

interface ProjectCategory {
    id: number;
    name: string;
    description: string;
    subcategoryList: ProjectSubcategory[];
}

interface ProjectSubcategory {
    id: number;
    name: string;
    categoryId: number;
    description: string;
}

interface ProjectListFilters {
    categoriesId?: number[];
    subcategoriesId?: number[];
    visibleFinishedProject?: boolean;
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
interface ProjectComment {
    id: number;
    parentId?: number;
    projectId: number;
    user: {
        id: number;
        nickname: string;
    };
    text: string;
    createdDate: string;
}
enum ProjectDurationType {
    ExpirationDate = 'expiration_date',
    NumberDays = 'number_days',
}
