import { IsDate, IsNumber, IsString } from 'class-validator';

export class SaveProjectDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly title: string;

    @IsString()
    readonly subtitle: string;

    @IsNumber()
    readonly categoryId: number;

    @IsNumber()
    readonly subcategoryId: number;

    @IsString()
    readonly imageUrl: string;
    @IsNumber()
    readonly fundingGoal: number;

    @IsString()
    readonly projectDurationType: string;

    @IsDate()
    readonly expirationDate?: Date;

    @IsNumber()
    readonly numberDays?: number;

    @IsString()
    readonly contractAddress: string;
}
