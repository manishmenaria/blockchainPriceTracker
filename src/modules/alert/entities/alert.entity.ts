import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  //   @Column('decimal', { precision: 18, scale: 8 })
  //   dollar: number;

  @Column()
  email: string;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  threshold: number; // Default value added

  @CreateDateColumn()
  createdAt: Date;
}
