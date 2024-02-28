import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    async createBookmark(userId: string, dto: CreateBookmarkDto) {
        return await this.prisma.bookMark.create({
            data: {
                title: dto.title,
                link: dto.link,
                userId
            }
        })
    }

    async getBookmarks(userId: string) {
        return await this.prisma.bookMark.findMany({
            where: {
                userId
            }
        })
    }

    async getBookmarksById(userId: string, bookmarkId: string) {
        return await this.prisma.bookMark.findUnique({
            where: {
                userId: userId,
                id: bookmarkId
            }
        })
    }

    async editBookmarkById(userId: string, bookmarkId: string, dto: EditBookmarkDto) {
        const bookmark = await this.prisma.bookMark.findUnique({
            where: {
                id: bookmarkId,
            }
        })
        if (!bookmark || bookmark.userId!==userId)
        throw new UnauthorizedException('You are not authorized to perform this action')
        return await this.prisma.bookMark.update({
            where: {
                id: bookmarkId,
                userId
            },
            data: {
                ...dto
            }
        })
    }

    async deleteBookmarkById(userId: string, bookmarkId: string) {
        const bookmark = await this.prisma.bookMark.findUnique({
            where: {
                id: bookmarkId,
            }
        })
        if (!bookmark || bookmark.userId!==userId)
        throw new UnauthorizedException('You are not authorized to perform this action')
        return await this.prisma.bookMark.delete({
            where: {
                id: bookmarkId,
                userId
            }
        })
    }
}
