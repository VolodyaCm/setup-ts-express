import IModels from '@/db/models/types';
import { MutationResolvers, QueryResolvers } from '@/gql/types/generated';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IGqlContext {
  models: IModels;
  req: Request;
  res: Response;
  tokenInfo: JwtPayload;
}

export type IMutationResolverWithContext = MutationResolvers<IGqlContext>;
export type IQueryResolversWithContext = QueryResolvers<IGqlContext>;
