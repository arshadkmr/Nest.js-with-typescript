import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: { userId: string; email: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.userId
        }
      })
      if (!user) throw new UnauthorizedException('User not found')
      delete user.password
      return user
    } catch (err) {
      throw err
    }
  }
}
