import {
  CreateUserInput,
  User,
  GetUsersInput,
  SigninInput,
  UpdateUserInput,
} from '@/gql/types/generated';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';

export type GetUsersType = (input: GetUsersInput) => Promise<User[]>;
export type GetUserType = (id: string) => Promise<User>;
export type GetMeType = () => Promise<User>;
export type createUserType = (data: CreateUserInput) => Promise<User>;
export type SigninUserType = (input: SigninInput) => Promise<User>;
export type UpdateUserType = (
  id: string,
  input: UpdateUserInput
) => Promise<User>;

export interface IJwtPayload extends JwtPayload {
  email: string;
}

export interface IUserModel {
  model: Model<User>;
  getUsers: GetUsersType;
  getUser: GetUserType;
  getMe: GetMeType;
  createUser: createUserType;
  signin: SigninUserType;
  updateUser: UpdateUserType;
}

export default interface IModels {
  User: IUserModel;
}
