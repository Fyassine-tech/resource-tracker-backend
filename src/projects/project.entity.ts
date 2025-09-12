import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column({ type: 'text', nullable: true }) description?: string;

  @Column({ default: 'Planned' })
  status: 'Planned' | 'In-Progress' | 'Blocked' | 'At-Risk' | 'Done';

  @Column({ default: 'Med' })
  priority: 'Low' | 'Med' | 'High';

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
