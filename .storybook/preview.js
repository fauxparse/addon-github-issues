import { addParameters } from '@storybook/react';

addParameters({
  issues: {
    repository: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN,
  },
});
