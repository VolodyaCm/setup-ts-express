import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { User } from '@/gql/types/generated';
import {
  GetUsersType,
  createUserType,
  IJwtPayload,
  SigninUserType,
  UpdateUserType,
  GetUserType,
} from './types';
import jwt from 'jsonwebtoken';

const { genSalt, hash, compare } = bcryptjs;
const MSG_INVALID_EMAIL = 'Invalid email or password';

const UserSchema = new Schema({
  name: { required: true, type: String, min: 3, max: 60 },
  password: { required: true, type: String, min: 8, max: 32 },
  email: { required: true, type: String, unique: true, min: 3, max: 60 },
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

export const UserModel = model('User', UserSchema);

export const sign = (email: string): string => {
  return jwt.sign(
    {
      email,
    },
    process.env.APP_API_KEY,
    {
      expiresIn: process.env.APP_SIGN_EXPIRES_IN,
    }
  );
};

export const signin: SigninUserType = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error(MSG_INVALID_EMAIL);

  if (!(await compare(password, user.password))) {
    throw new Error(MSG_INVALID_EMAIL);
  }

  return user;
};

export const verifyToken = async (token: string) => {
  const data = jwt.verify(token, process.env.APP_API_KEY) as IJwtPayload;
  const user = await UserModel.findOne({ email: data.email });
  return user;
};

export const createUser: createUserType = async ({
  privilege = 'user',
  ...data
}) => {
  const password = await hash(
    data.password + process.env.APP_SALT,
    await genSalt(10)
  );
  const exist = await UserModel.findOne({ email: data.email });

  if (exist) throw new Error('Email is invalid or already taken');

  const user = new UserModel({
    ...data,
    privilege,
    password,
  });

  return user.save();
};

export const getUsers: GetUsersType = async ({
  size = 10,
  offset = 0,
} = {}) => {
  const users: User[] = await UserModel.find().limit(size).skip(offset).exec();
  return users;
};

export const updateUser: UpdateUserType = async (id, input) => {
  const user = await UserModel.findByIdAndUpdate(id, {
    ...input,
    updatedAt: Date.now(),
  });
  return user;
};

export const getUser: GetUserType = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

const modelObj = {
  model: UserModel,
  createUser,
  getUsers,
  signin,
  updateUser,
  getUser,
};

export default modelObj;
