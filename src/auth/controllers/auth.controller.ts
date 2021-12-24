import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJTW(user);
  }

  @Post('refresh')
  refreshToken(@Req() req: Request) {
    const token  = req.headers.authorization;
    return this.authService.refreshToken(token);
    
  }


  @Post('validate')
  validate(@Req() req: Request) {
    const token  = req.headers.authorization;
    return this.authService.validateToken(token);
    
  }
}
