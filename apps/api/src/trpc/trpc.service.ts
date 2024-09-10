import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from './transformer';
import * as trpcExpress from '@trpc/server/adapters/express';

// import superjson from "superjson";

export interface TrpcContext extends trpcExpress.CreateExpressContextOptions {
  user?: string;
}




export const createContext = async ({
  info,
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<TrpcContext> => {
  const header = req.headers.authorization;
  const token = header?.split(' ')[1];
  return {
    info,
    req,
    res,
    user: token
  };
}; // context

export type Context = Awaited<ReturnType<typeof createContext>>;


@Injectable()
export class TrpcService {


  trpc = initTRPC.context<TrpcContext>().create({ transformer });
  publicProcedure = this.trpc.procedure;

  protectedProcedure = this.trpc.procedure.use(async (opts) => {
    const { ctx } = opts;
    if (!ctx.req.headers.authorization) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' });
    }
    return opts.next({
      ctx: {
        user: ctx.req.headers.authorization,
      },
    });
  });
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
