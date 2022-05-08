import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Category } from './category/entities/category.entity';
import { MeetingUser } from './meeting/entities/meeting-user.entity';
import { Meeting } from './meeting/entities/meeting.entity';
import { Record } from './record/entities/record.entity';
import { User } from './user/entities/user.entity';

const isDevelopment = process.env.NODE_ENV !== 'production';

dotenv.config({
  path: `.env.${isDevelopment ? 'development' : 'production'}`,
});

const connectionOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Meeting, Record, Category, MeetingUser],
  autoLoadEntities: true,
  synchronize: isDevelopment ? true : false,
  logging: isDevelopment ? true : false,
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  charset: 'utf8mb4',
};

export default connectionOptions;
