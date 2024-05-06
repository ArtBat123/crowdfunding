import { ProjectCategory } from 'src/project-category/project-category.entity';
import { ProjectSubcategory } from 'src/project-category/project-subcategory.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

enum ProjectDurationType {
    ExpirationDate = 'expiration_date',
    NumberDays = 'number_days',
}

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    @ManyToOne(
        () => ProjectCategory,
        (category: ProjectCategory) => category.id,
    )
    @JoinColumn({ name: 'categoryId' })
    categoryId: number;

    @Column()
    @ManyToOne(
        () => ProjectSubcategory,
        (subcategory: ProjectSubcategory) => subcategory.id,
    )
    @JoinColumn({ name: 'subcategoryId' })
    subcategoryId: number;

    @Column()
    imageUrl: string;

    @Column()
    fundingGoal: number;

    @Column({ enum: ProjectDurationType })
    projectDurationType: string;

    @Column({ nullable: true })
    expirationDate: Date;

    @Column({ nullable: true })
    numberDays: number;

    @Column({ nullable: true, type: 'text' })
    story: string;
}
