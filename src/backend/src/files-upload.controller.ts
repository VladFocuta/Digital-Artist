import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files-upload')
export class FilesUploadController {
    @Post('upload/:userId')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + req.body.userId + extname(file.originalname) + '.png';
                callback(null, uniqueSuffix);
            },
        }),
    }))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return { message: 'File uploaded successfully!' };
    }

