import AuthForm from './AuthForm';

export default {
  component: AuthForm,
  title: 'Authentication form',
  tags: ['autodocs'],
};

const logIn = () => {};

export const Default = {
  args: {
    authForm: {
      logIn: { logIn },
    },
  },
};
