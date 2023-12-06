import { Button, ButtonProps } from '@mantine/core';
import GoogleIcon from './GoogleIcon';

export default function GoogleButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) {
  return <Button leftSection={<GoogleIcon />} variant="default" {...props} />;
}
