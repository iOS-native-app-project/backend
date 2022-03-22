import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
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
  entities: [User],
  synchronize: isDevelopment ? true : false,
  logging: isDevelopment ? true : false,
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
};

export default connectionOptions;
