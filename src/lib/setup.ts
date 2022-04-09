import cors from 'cors';
import models from '@/db/models/.';
import typeDefs from '@/gql/types/.';
import resolvers from '@/gql/resolvers/.';
import { verifyToken } from '@/db/models/user';
import { graphqlHTTP } from 'express-graphql';
import { Request, Response } from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';

const getSchema = () =>
  makeExecutableSchema({
    typeDefs,
    resolvers,
  });

export const getCors = () =>
  cors({
    credentials: true,
    origin: process.env.ORIGIN === '*' ? true : process.env.ORIGIN,
    exposedHeaders: 'Set-Cookie',
  });

export const getGqlHTTP = () =>
  graphqlHTTP(async (req: Request, res: Response) => {
    const tokenInfo = req.cookies.token
      ? await verifyToken(req.cookies.token)
      : null;

    return {
      schema: getSchema(),
      graphiql: true,
      context: {
        models,
        req,
        res,
        tokenInfo,
      },
    };
  });
