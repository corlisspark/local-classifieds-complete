// /Users/thiagotavares/Projects/Services/apps/api/src/config/app.config.ts

export interface AppConfig {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  cors: {
    origin: string[];
    credentials: boolean;
  };
}

export const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || 'api',
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001'],
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
};
