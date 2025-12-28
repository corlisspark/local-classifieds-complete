// apps/api/src/modules/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: AuthRequest) {
    return req.user;
  }
}

interface AuthRequest extends Request {
  user: {
    userId: string;
    role: UserRole;
  };
}
