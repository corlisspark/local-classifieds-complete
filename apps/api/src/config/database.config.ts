// /Users/thiagotavares/Projects/Services/apps/api/src/config/database.config.ts

export interface DatabaseConfig {
  url: string;
  maxConnections: number;
  connectionTimeout: number;
  queryTimeout: number;
}

export const databaseConfig: DatabaseConfig = {
  url:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/local_classifieds',
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '10', 10),
  connectionTimeout: parseInt(
    process.env.DATABASE_CONNECTION_TIMEOUT || '10000',
    10,
  ),
  queryTimeout: parseInt(process.env.DATABASE_QUERY_TIMEOUT || '30000', 10),
};
