import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Project } from './project.entity';

@Entity()
export class ProjectComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @ManyToOne(() => ProjectComment, (comment) => comment.id)
    @JoinColumn({ name: 'parentId' })
    parentId?: number;

    @ManyToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    @ManyToOne(() => Project, (project) => project.id)
    @JoinColumn({ name: 'projectId' })
    projectId: number;

    @Column({ type: 'text' })
    text: string;

    @CreateDateColumn({ name: 'created_date' })
    createdDate: Date;
}
