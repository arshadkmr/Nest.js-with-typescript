import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ValidationError,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) { }

  async signup(dto: AuthDto) {
    console.log('dto : ', dto);
    try {
      const errors= await validate(dto)
      console.log("errors: ", errors);
      const userExist = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (userExist) {
        throw new ConflictException('User already exists');
      } else {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            password: hash,
          },
        });
        return await this.generateToken(user.id, user.email);
      }
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException('User does not exist');
      } else {
        const comparePassword = await argon.verify(user.password, dto.password);
        if (!comparePassword) {
          throw new UnauthorizedException('Invalid password');
        } else {
          return await this.generateToken(user.id, user.email);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async generateToken(
    userId: string,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      userId,
      email,
    };
    const jwtToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
    return { token: jwtToken };
  }
}
