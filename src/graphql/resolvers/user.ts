import { Response } from 'express';
import { sign } from '@/db/models/user';
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  GetUsersInput,
} from '@/gql/types/generated';
import {
  IMutationResolverWithContext,
  IQueryResolversWithContext,
} from './types';
import { IGqlContext } from './types';

const Auth =
  <CbT, ArgsT>(cb: CbT) =>
  (...params: [unknown, ArgsT, IGqlContext]) => {
    const { tokenInfo } = params[2];

    if (!tokenInfo) throw new Error('unauthorized');
    if (typeof cb === 'function') {
      return cb(...params);
    } else {
      throw new Error('cb is not a function');
    }
  };

const setCookie = async (email: string, res: Response) => {
  const token = await sign(email);

  return res.cookie('token', token, {
    path: '/',
    domain: process.env.APP_COOKIE_DOMAIN,
    httpOnly: true,
  });
};

const createUser = Auth<
  IMutationResolverWithContext['createUser'],
  CreateUserInput
>(async (...params): Promise<User> => {
  const { input } = params[1];
  const { models } = params[2];
  const user = await models.User.createUser(input);

  return user;
});

export const register: IMutationResolverWithContext['register'] = async (
  ...params
) => {
  const { input } = params[1];
  const { models, res } = params[2];
  const user = await models.User.createUser(input);

  await setCookie(input.email, res);

  return user;
};

const signin: IQueryResolversWithContext['signin'] = async (
  ...params
): Promise<User> => {
  const { input } = params[1];
  const { models, res } = params[2];
  const user = await models.User.signin(input);

  await setCookie(user.email, res);

  return user;
};

const getUsers: IQueryResolversWithContext['getUsers'] = async (
  ...params
): Promise<User[]> => {
  const { input } = params[1];
  const { models } = params[2];
  const users = await models.User.getUsers(input);

  return users;
};

const getUser = Auth<IQueryResolversWithContext['getUser'], GetUsersInput>(
  async (...params) => {
    const { id } = params[1];
    const { models } = params[2];
    const user = await models.User.getUser(id);

    return user;
  }
);

const getMe = Auth<IQueryResolversWithContext['getMe'], void>(
  async (...params) => {
    const {
      tokenInfo: { email },
      models,
    } = params[2];
    const user = await models.User.model.findOne({ email });
    return user;
  }
);

const updateUser = Auth<
  IMutationResolverWithContext['updateUser'],
  UpdateUserInput
>(async (...params) => {
  const { id, input } = params[1];
  const { models } = params[2];
  const user = await models.User.updateUser(id, input);

  return user;
});

const userResolvers = {
  Query: {
    getUsers,
    getUser,
    signin,
    getMe,
  },
  Mutation: {
    createUser,
    register,
    updateUser,
  },
};

export default userResolvers;
