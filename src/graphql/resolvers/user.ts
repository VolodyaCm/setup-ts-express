const getUsers = () => {
  return [{ id: 'asdsd' }, { id: 'sdsad' }];
};

const createUser = () => {
  return { id: 'sdsad' };
};

const userResolvers = {
  Query: {
    getUsers,
  },
  Mutation: {
    createUser,
  },
};

export default userResolvers;
