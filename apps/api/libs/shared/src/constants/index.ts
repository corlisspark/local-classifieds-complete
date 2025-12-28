// /Users/thiagotavares/Projects/Services/libs/shared/src/constants/index.ts
export const API_ROUTES = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  HEALTH: '/api/health',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const DATABASE = {
  CONNECTION_TIMEOUT: 30000,
  QUERY_TIMEOUT: 10000,
} as const;

export const CACHE = {
  TTL: {
    SHORT: 300, // 5 minutes
    MEDIUM: 1800, // 30 minutes
    LONG: 3600, // 1 hour
  },
} as const;
