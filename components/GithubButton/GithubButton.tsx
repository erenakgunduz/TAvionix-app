import { Button, ButtonProps } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import classes from './GithubButton.module.css';

export default function GithubButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'button'>
) {
  return (
    <Button
      {...props}
      leftSection={<IconBrandGithub style={{ width: '1rem', height: '1rem' }} />}
      className={classes.githubButton}
    />
  );
}
