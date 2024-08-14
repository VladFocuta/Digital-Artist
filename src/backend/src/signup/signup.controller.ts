import {
    Controller, Post, Body, Get, Query, UseGuards, Request

} from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './signup.dto';
import { AuthGuard } from './auth.guard';



@Controller('signup')
export class SignupController {

    constructor(
        private readonly signupService: SignupService
    ) { }

    @Post()
    signup(@Body() signupDto: SignupDto) {
        return this.signupService.signup(signupDto);
    }

    @Get('login')
    async login(@Query('email') email: string, @Query('password') password: string) {
        return this.signupService.login(email, password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any) {
        return req.user;
    }

}
