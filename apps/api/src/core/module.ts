import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Global()
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
  controllers: [],
  providers: [PrismaService, JwtService,AuthService],
  exports: [PrismaService, AuthModule, JwtService,AuthService],
})
export class CoreSharedModule {}