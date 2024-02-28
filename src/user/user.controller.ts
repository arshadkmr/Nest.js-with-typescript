import { Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path'

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto)
  }

  @UseGuards(JwtGuard)
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './assets/uploads/',
      filename: (req, file, callBack) => {
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now()
        const extension = path.parse(file.originalname).ext
        callBack(null, `${fileName}${extension}`)
      }
    })
  }))
  uploadFile(@GetUser() user: User, @UploadedFile() file: Express.Multer.File, @Body() dto: EditUserDto) {
    return this.userService.uploadImage(user.id, dto, file)
  }
}
