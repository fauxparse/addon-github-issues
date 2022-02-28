import { Button, Icon } from '@storybook/design-system';
import newGithubIssueUrl from 'new-github-issue-url';
import React, { useContext } from 'react';
import { ConfigurationContext } from './configuration';

const NewIssueButton: React.FC = () => {
  const { repository, labels } = useContext(ConfigurationContext);
  const [user, repo] = repository.split('/', 2);

  return (
    <Button
      ButtonWrapper="a"
      appearance="primary"
      href={newGithubIssueUrl({
        user,
        repo,
        labels: labels.map((label) => label.name),
      })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon icon="github" aria-label="Create an issue" />
      Create an issue on Github
    </Button>
  );
};

export default NewIssueButton;
