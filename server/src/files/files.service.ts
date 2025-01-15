import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    async createFile(file: Express.Multer.File) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', 'static');
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return {
                fileName,
                fileUrl: '/static/' + fileName,
            };
        } catch (e) {
            console.error(e);
            throw new HttpException('Ошибка записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
