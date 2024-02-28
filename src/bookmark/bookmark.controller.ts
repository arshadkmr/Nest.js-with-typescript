import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) { }

    @Post()
    createBookmark(@GetUser() user: User, @Body() dto: CreateBookmarkDto) {
        return this.bookmarkService.createBookmark(user.id, dto);
    }

    @Get()
    getBookmarks(@GetUser() user: User) {
        return this.bookmarkService.getBookmarks(user.id);
    }

    @Get(':id')
    getBookmarksById(@GetUser() user: User, @Param('id') bookmarkId: string) {
        return this.bookmarkService.getBookmarksById(user.id, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') user: User, @Body() dto: EditBookmarkDto, @Param('id') bookmarkId: string) {
        return this.bookmarkService.editBookmarkById(user.id, bookmarkId, dto)
    }

    @Delete(':id')
    deleteBookmarkById(@GetUser('id') user: User, @Param('id') bookmarkId: string) {
        return this.bookmarkService.deleteBookmarkById(user.id, bookmarkId)
    }
}
