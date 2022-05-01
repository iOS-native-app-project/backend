import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Category } from './category/entities/category.entity';
import { MeetingUserDetail } from './meeting/entities/meeting-user-detail.entity';
import { MeetingUser } from './meeting/entities/meeting-user.entity';
import { Meeting } from './meeting/entities/meeting.entity';
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
  entities: [User, Meeting, Category, MeetingUser, MeetingUserDetail],
  autoLoadEntities: true,
  synchronize: isDevelopment ? true : false,
  logging: isDevelopment ? true : false,
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  charset: 'utf8mb4',
  timezone: 'Asia/Seoul',
};

export default connectionOptions;
