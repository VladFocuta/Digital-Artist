import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1];
        try {
            const payload = await this.jwtService.verify(token,{ secret: '*****' });
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

    }
}
