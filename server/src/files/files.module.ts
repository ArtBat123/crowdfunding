import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilesController } from './files.controller';

@Module({
    providers: [FilesService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '/static'),
            serveRoot: '/static',
        }),
    ],
    exports: [FilesService],
    controllers: [FilesController],
})
export class FilesModule {}
