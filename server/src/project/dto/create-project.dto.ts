export class CreateProjectDto {
    readonly title: string;
    readonly subtitle: string;
    readonly categoryId: number;
    readonly subcategoryId: number;
    readonly imageUrl: string;
    readonly fundingGoal: number;
    readonly projectDurationType: string;
    readonly expirationDate?: Date;
    readonly numberDays?: number;
}
