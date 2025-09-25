import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/project.entity.js';
import { User } from '../../users/user.entity.js';

@Entity({ name: 'allocations' })
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Project, { eager: true, onDelete: 'CASCADE' })
  project: Project;

  @Column({ type: 'int', nullable: true })
  pct: number | null;

  @Column({ type: 'int', nullable: true, name: 'hours_per_week' })
  hoursPerWeek: number | null;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string | null;
}
