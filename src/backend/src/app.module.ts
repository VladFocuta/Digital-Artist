import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './signup/signup.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesUploadController } from './files-upload/files-upload.controller';
import { FilesController } from './files/files.controller';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vladfocuta:Parolanoua123@cluster0.pxuc2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    SignupModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [AppController, FilesUploadController, FilesController],
  providers: [AppService],
})
export class AppModule { }
