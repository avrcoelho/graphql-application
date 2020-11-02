import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
    name: "mongo",
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "graphql_application",
    useUnifiedTopology: true,
    entities: [
      path.resolve(
        __dirname,
        '..',
        'modules',
        '**',
        'infra',
        'typeorm',
        'entities',
        '*.entity{.ts,.js}',
      ),
    ]
  };

export default options;
