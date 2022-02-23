import dotenv from 'dotenv';

dotenv.config();

export const env = {
  app: {
    port: Number(process.env.PORT) || 3000,
    jwtAccessSecret:
      process.env.JWT_SECRET_ACCESS_KEY || 'JWT_SECRET_ACCESS_KEY',
    jwtRefreshSecret:
      process.env.JWT_SECRET_REFRESH_KEY || 'JWT_SECRET_REFRESH_KEY',
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
  },
  swagger: {
    route: process.env.SWAGGER_ROUTE || '/api-docs',
  },
};
