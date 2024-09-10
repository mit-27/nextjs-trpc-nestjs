import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [TrpcService, TrpcRouter,PrismaService],
})
export class TrpcModule { }

