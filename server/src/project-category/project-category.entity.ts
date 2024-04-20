import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectSubcategory } from './project-subcategory.entity';

@Entity({ name: 'project_categories_dictionary' })
export class ProjectCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(
        () => ProjectSubcategory,
        (projectSubcategory) => projectSubcategory.category,
    )
    subcategoryList: ProjectSubcategory[];
}
