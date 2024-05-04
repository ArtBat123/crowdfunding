import { ProjectCategory } from 'src/project-category/project-category.entity';
import { ProjectSubcategory } from 'src/project-category/project-subcategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @ManyToOne(() => ProjectCategory, { nullable: false })
    category: ProjectCategory;

    @ManyToOne(() => ProjectSubcategory, { nullable: false })
    subcategory: ProjectSubcategory;

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
