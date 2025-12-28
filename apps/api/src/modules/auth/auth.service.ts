// apps/api/src/modules/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@api/database';
import { CreateUserDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly jwt: JwtService,
    private readonly db: PrismaService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    if (!password || password.length < 6)
      throw new BadRequestException('Password too short');
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) return false;
    return await bcrypt.compare(password, hash);
  }

  async register(dto: CreateUserDto) {
    const existing = await this.db.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await this.hashPassword(dto.password);
    const user = await this.db.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.db.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await this.validatePassword(
      dto.password,
      user.passwordHash,
    );
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<{
        sub: string;
        role: string;
      }>(refreshToken);
      const user = await this.db.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) throw new UnauthorizedException('Invalid refresh token');

      const newPayload = { sub: user.id, role: user.role };
      const access_token = await this.jwt.signAsync(newPayload, {
        expiresIn: '15m',
      });

      return { access_token };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
