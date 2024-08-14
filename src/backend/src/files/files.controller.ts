import { Controller, Get, Param } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FilesController {
    @Get('image')
    getUserFiles(@Param('userId') userId: string) {
        const uploadsDir = path.join(__dirname, '..', 'uploads');

        if (!fs.existsSync(uploadsDir)) {
            return { emptyfiles: [] };
        }

        const files = fs.readdirSync(uploadsDir);
        const fileUrls = files.map(file => ({
            url: `http://localhost:8000/uploads/${file}`, 
            filename: file,
            description: 'description',
            title: 'title'
        }));
        
        return { files: fileUrls };
    }
}
