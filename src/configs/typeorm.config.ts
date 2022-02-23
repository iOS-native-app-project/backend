import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { env } from './env';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.name,
  entities: [User],
  charset: 'utf8mb4',
  synchronize: env.database.synchronize,
  logging: env.database.logging,
};
