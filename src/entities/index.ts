import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DateEntity {
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt!: Date;
}

export abstract class DeleteDateEntity extends DateEntity {
  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deleteAt!: Date | null;
}

export abstract class AutoIdDateEntity extends DateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;
}

export abstract class AutoIdDeleteDateEntity extends DeleteDateEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;
}
