import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from './transformer';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AuthService } from 'src/core/auth/auth.service';
import { User } from '@prisma/client';
// import superjson from "superjson";

export interface TrpcContext extends trpcExpress.CreateExpressContextOptions {
  user?: User;
}

export const createContext = async ({
  info,
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<TrpcContext> => {
  // const header = req.headers.authorization;
  // const token = header?.split(' ')[1];
  return {
    info,
    req,
    res,
    // user: token
  };
}; // context

export type Context = Awaited<ReturnType<typeof createContext>>;


@Injectable()
export class TrpcService {

    constructor(private authService: AuthService) { }


  trpc = initTRPC.context<TrpcContext>().create({ transformer });
  publicProcedure = this.trpc.procedure;

  protectedProcedure = this.trpc.procedure.use(async (opts) => {
    const { ctx } = opts;
    if (!ctx.req.headers.authorization) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }
    const user = await this.authService.login(ctx.req.headers.authorization);

    if(!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }

    return opts.next({
      ctx: {
        user,
      },
    });
  });
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
