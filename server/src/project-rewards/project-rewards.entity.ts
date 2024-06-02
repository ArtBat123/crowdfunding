import { Project } from 'src/project/project.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'project_rewards' })
export class ProjectRewards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    imageUrl: string;

    @Column({ nullable: true })
    limit: number;

    @Column()
    @ManyToOne(() => Project, (project: Project) => project.id)
    @JoinColumn({ name: 'projectId' })
    projectId: number;

    @Column()
    description: string;
}
