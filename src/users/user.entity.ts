import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  weeklyHours: number | null;

  @Column({ type: 'int', nullable: true })
  capacityPct: number | null;

  @Column({ default: true })
  active: boolean;
}
