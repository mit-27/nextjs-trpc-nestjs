import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { transformer } from './transformer';
// import superjson from "superjson";

@Injectable()
export class TrpcService {
    trpc = initTRPC.create({ transformer });
    procedure = this.trpc.procedure;
    router = this.trpc.router;
    mergeRouters = this.trpc.mergeRouters;
}
