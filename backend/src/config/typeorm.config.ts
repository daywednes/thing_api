import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const fs = require('fs');

const dbConfig = config.get('db');
const migrationsDir = '/db/migrations';
const entitiesPath = [__dirname + '/../**/*.entity.{ts,js}'];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  url: dbConfig.mongourl,
  entities: entitiesPath,
  migrations: [migrationsDir + '/*.js'],
  synchronize: dbConfig.synchronize,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  replicaSet: 'cluster0-shard-0',
  extra: {
    ssl:true,
    authSource: "admin"
  },
  ssl: {
    rejectUnauthorized: false
  },

};
