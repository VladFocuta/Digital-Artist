import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupSchema } from './signup.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Signup',
      schema: SignupSchema
    }]),
    JwtModule.register({
      secret: '***',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [SignupController],
  providers: [SignupService, AuthGuard],
  exports: [JwtModule]
})
export class SignupModule { }
