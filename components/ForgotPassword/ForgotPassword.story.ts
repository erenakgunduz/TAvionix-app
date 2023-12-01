import ForgotPassword from './ForgotPassword';

export default {
  component: ForgotPassword,
  title: 'Forgot password',
  tags: ['autodocs'],
};

const resetPassword = () => {};

export const Default = {
  args: {
    forgotPassword: {
      resetPassword: { resetPassword },
    },
  },
};
