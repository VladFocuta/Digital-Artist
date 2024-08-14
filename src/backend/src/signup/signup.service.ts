import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface User {
    email: string,
    password: string,
    name: string
}


@Injectable()
export class SignupService {
    constructor(
        @InjectModel('Signup') private signupModel: Model<SignupModel>,
        private jwtService: JwtService,
    ) { }

    async signup(user: User) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const newUser = new this.signupModel({
            email: user.email,
            password: hashedPassword,
            name: user.name
        })
        try {
            await newUser.save()
        } catch (error) {
            console.log(error)
        }
    }

    async login(email: string, password: string) {
        const user = await this.signupModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials-no user');
        }

        const passwordIsValid = await bcrypt.compare(password, String(user.password));
        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials-password')
        }

        const payload = { email: user.email, sub: user._id, name: user.name };
        const token = this.jwtService.sign(payload);

        return {
            message: 'Logged in',
            accessToken: token,
        }
    }


}
