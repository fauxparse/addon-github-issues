import React from 'react';
import { Highlight } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import Error from './Error';

const Snippet = styled(Highlight)({
  margin: '0 2rem',
});

const MissingConfiguration: React.FC = () => {
  return (
    <Error>
      <h2>
        Missing configuration for <code>addon-github-issues</code>
      </h2>
      <p>
        Make sure your configuration in <code>.storybook/preview.js</code> includes:
      </p>
      <Snippet language="javascript">
        {`
          addParameters({
            issues: {
              repository: process.env.GITHUB_REPO,
              token: process.env.GITHUB_TOKEN,
            },
          });
        `}
      </Snippet>
      <p>
        and that you have a <code>.env</code> file in the root of your project containing (at
        least):
      </p>
      <Snippet language="bash">
        {`
        GITHUB_REPOSITORY=username/repo
        GITHUB_TOKEN=your_auth_token
        `}
      </Snippet>
      <p>
        <b>(Do not check this file into source control!)</b>
      </p>
      <p>
        You can generate a{' '}
        <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
          personal access token at Github
        </a>
        . You will need to enable at least the <code>repo</code> scope.
      </p>
      <p>Be sure to restart your Storybook after making these changes.</p>
    </Error>
  );
};

export default MissingConfiguration;
