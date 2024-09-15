import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectCategory } from './project-category.entity';

@Entity({ name: 'project_subcategories_dictionary' })
export class ProjectSubcategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    @ManyToOne(() => ProjectCategory, (category: ProjectCategory) => category.id)
    @JoinColumn({ name: 'categoryId' })
    categoryId: number;
}
