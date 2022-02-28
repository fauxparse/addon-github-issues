import React, { useContext } from 'react';
import { TagList } from '@storybook/design-system';
import Error from './Error';
import Label from './Label';
import { ConfigurationContext } from './configuration';
import NewIssueButton from './NewIssueButton';

const NoIssues: React.FC = () => {
  const { labels } = useContext(ConfigurationContext);
  return (
    <Error>
      <h2>No issues found.</h2>
      <p>We looked for open issues tagged with:</p>
      <p>
        <TagList
          tags={labels.map((label) => (
            <Label key={label.name} {...label} />
          ))}
        />
      </p>
      <NewIssueButton />
    </Error>
  );
};

export default NoIssues;
