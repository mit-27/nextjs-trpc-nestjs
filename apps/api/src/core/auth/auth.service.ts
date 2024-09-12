import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { users } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService: PrismaService) { }


  async login(token: string) : Promise<users | null> {
    try{
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const currentToken = token.split(' ')[1];
      const ticket = await client.verifyIdToken({
        idToken: currentToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    
      const payload = ticket.getPayload()!;
      console.log(`Payload: ${payload.sub}`);
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      if (payload.exp < currentTimestamp) {
        throw new Error();
      }

      if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new Error();
      }

      // Check if user exists in database
      let user = await this.prismaService.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        // Create user in database
        user = await this.prismaService.users.create({
          data: {
            id: payload.sub,
            email: payload.email!,
            name: payload.name,
            image: payload.picture,
            emailverified: payload.email_verified,
          },
        });
      }

      return user;
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }
}