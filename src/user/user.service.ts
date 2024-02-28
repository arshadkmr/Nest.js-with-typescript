import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async editUser(userId: string, dto: EditUserDto): Promise<EditUserDto> {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
            }
        })
        delete user.password
        return user
    }

    async uploadImage(userId: string, dto: EditUserDto, file: Express.Multer.File): Promise<EditUserDto> {
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
                image: file.destination + file.filename
            }
        })
        delete user.password
        return user
    }
}
