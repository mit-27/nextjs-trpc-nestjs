import { Controller, Get, Post, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request) {
    const session = req.headers.authorization!;
    return this.authService.login(session);
  }
} 