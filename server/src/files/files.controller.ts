import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file) {
        return await this.filesService.createFile(file);
    }
}
