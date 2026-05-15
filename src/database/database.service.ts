import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type DrizzleDB = PostgresJsDatabase<typeof schema>;

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly client: postgres.Sql;
  readonly db: DrizzleDB;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>('DATABASE_URL')!;
    this.client = postgres(url, { max: 10 });
    this.db = drizzle(this.client, { schema, logger: false });
    this.logger.log('Database connection established');
  }

  async onModuleDestroy() {
    await this.client.end();
    this.logger.log('Database connection closed');
  }
}
