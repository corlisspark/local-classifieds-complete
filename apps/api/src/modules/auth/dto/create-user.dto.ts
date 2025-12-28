// apps/api/src/modules/auth/dto/create-user.dto.ts
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name too long'),
  email: z.string().email('Invalid email format').max(140, 'Email too long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password too long'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
