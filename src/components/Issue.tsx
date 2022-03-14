import React from 'react';
import { Link } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { IssueOpenedIcon } from '@primer/octicons-react';

export interface IssueProps {
  id: string;
  number: number;
  title: string;
  url: string;
}

const Wrapper = styled.div(({ theme }) => ({
  borderTop: `1px solid ${theme.appBorderColor}`,
}));

const IssueLink = styled(Link)`
  display: block;

  &:hover {
    transform: none;
  }

  > span {
    display: flex;
    align-items: flex-start;
    padding: 12px;

    > svg:last-child {
      align-self: center;
    }
  }
`;

const IssueNumber = styled.span({ fontWeight: 'bold', flex: '0 0 4em' });

const IssueTitle = styled.span({ flex: 1 });

const Issue: React.FC<IssueProps> = ({ number, title, url }) => {
  return (
    <Wrapper>
      <IssueLink href={url} withArrow>
        <IssueOpenedIcon verticalAlign="text-top" />
        <IssueNumber>{`#${number}`}</IssueNumber>
        <IssueTitle>{title}</IssueTitle>
      </IssueLink>
    </Wrapper>
  );
};

export default Issue;
