import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

export const appConfig = registerAs(
  'app-config',
  () =>
    ({
      DOCS_URL: '/docs',
      HTTP_PORT: Number(process.env.HTTP_PORT),
    }) as const,
);

const typeOrmConfig = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT) || 5432,
  database: process.env.PG_DATABASE || 'postgres',
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'secret',
  synchronize: false,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../database/migrations/**/*.{ts,js}`],
  seeds: [`${__dirname}/../database/seeds/*.{ts,js}`],
};

export const dbConfig = registerAs(
  'db-config',
  (): TypeOrmModuleOptions => typeOrmConfig as TypeOrmModuleOptions,
);
export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);
