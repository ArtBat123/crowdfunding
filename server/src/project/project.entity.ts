import { ProjectCategory } from 'src/project-category/project-category.entity';
import { ProjectSubcategory } from 'src/project-category/project-subcategory.entity';
import { User } from 'src/users/users.entity';
import {
    AfterLoad,
    Column,
    CreateDateColumn,
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
    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;

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

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;

    @Column({ nullable: true })
    creatorEthAddress: string;

    deadline: Date;
    @AfterLoad()
    getDeadline() {
        if (this.projectDurationType === ProjectDurationType.ExpirationDate) {
            this.deadline = new Date(this.expirationDate);
        } else {
            this.deadline = new Date(
                Number(this.createdDate) +
                    this.numberDays * 24 * 60 * 60 * 1000,
            );
        }
    }
}
