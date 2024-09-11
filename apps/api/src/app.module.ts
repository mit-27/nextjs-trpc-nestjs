import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './trpc/trpc.module';
import { CoreSharedModule } from './core/module';

@Module({
  imports: [
    TrpcModule,
    CoreSharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
