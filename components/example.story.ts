import RegisterForm from './RegisterForm';

export default {
  component: RegisterForm,
  title: 'Register form',
  tags: ['autodocs'],
};

const signUp = () => {};

export const Default = {
  args: {
    registerForm: {
      signUp: { signUp },
    },
  },
};
