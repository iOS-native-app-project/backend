import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt!: Date;
}

export abstract class DeleteEntity extends CoreEntity {
  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt!: Date;
}
