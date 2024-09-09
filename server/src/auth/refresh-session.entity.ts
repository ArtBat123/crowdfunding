import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_session' })
export class RefreshSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;

    @Column({ unique: true })
    refreshToken: string;

    @Column()
    userAgent?: string;

    @Column()
    fingerprint?: string;

    @Column()
    ip?: string;
}
