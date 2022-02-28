import { Cardinal } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import React from 'react';
import Issue, { IssueProps } from './Issue';
import NewIssueButton from './NewIssueButton';

interface IssueListProps {
  issues: IssueProps[];
}

const IssueListWrapper = styled.div(({ theme }) => ({
  borderBottom: `1px solid ${theme.appBorderColor}`,
}));

const IssueListHeader = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  return (
    <IssueListWrapper>
      <IssueListHeader>
        <Cardinal count={issues.length} text="Open issue" status="negative" />
        <NewIssueButton />
      </IssueListHeader>
      {issues.map((issue) => (
        <Issue key={issue.id} {...issue} />
      ))}
    </IssueListWrapper>
  );
};

export default IssueList;
