import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService, createContext } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class TrpcRouter {
    constructor(private readonly trpc: TrpcService, private prisma: PrismaService) { }

    appRouter = this.trpc.router({
        hello: this.trpc.protectedProcedure
            .query(({ ctx }) => {
                // const { name } = input;
                return {
                    greeting: `Hello Mit ${ctx.user.email}`,
                };
            }),
        getAllPosts: this.trpc.publicProcedure
            .query(async () => {
                const posts = await this.prisma.post.findMany();
                return posts;
            }),

        addPost: this.trpc.publicProcedure
            .input(z.object({
                title: z.string(),
                content: z.string(),
            }))
            .mutation(async ({ input }) => {
                const newPost = await this.prisma.post.create({
                    data: {
                        title: input.title,
                        content: input.content,
                    },
                });
                return newPost;
            }),
    });


    async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
                createContext,
            }),
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];

