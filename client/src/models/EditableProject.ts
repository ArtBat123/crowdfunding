export class EditableProject {
    id?: number;
    title?: string;
    subtitle?: string;
    categoryId?: number;
    subcategoryId?: number;
    imageUrl?: string;
    fundingGoal?: number;
    projectDurationType?: ProjectDurationType;
    expirationDate?: Date;
    numberDays?: number;

    constructor(init: EditableProject = {}) {
        this.id = init.id;
        this.title = init.title;
        this.subtitle = init.subtitle;
        this.categoryId = init.categoryId;
        this.subcategoryId = init.subcategoryId;
        this.imageUrl = init.imageUrl;
        this.fundingGoal = init.fundingGoal;
        this.projectDurationType = init.projectDurationType;
        this.expirationDate = init.expirationDate;
        this.numberDays = init.numberDays;
    }
}
