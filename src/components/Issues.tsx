import React, { useEffect, useMemo, useState } from 'react';
import { graphql } from '@octokit/graphql';
import { Group, Story, useStorybookApi } from '@storybook/api';
import { Spinner } from '@storybook/design-system';
import has from 'lodash/has';
import kebabCase from 'lodash/kebabCase';
import last from 'lodash/last';
import flatMap from 'lodash/flatMap';
import isFunction from 'lodash/isFunction';
import { Configuration, ConfigurationContext } from './configuration';
import NoIssues from './NoIssues';
import IssueList from './IssueList';
import { IssueProps } from './Issue';

interface IssuesProps extends Configuration {
  labels?: string[] | ((story: Story) => string[]);
}

export type Label = {
  name: string;
  color: string;
};

const isStory = (subject: Story | Group): subject is Story => has(subject, 'kind');

const defaultLabel = (story: Story): string[] => [kebabCase(last(story.kind.split('/')))];

const Issues: React.FC<IssuesProps> = ({
  repository,
  token,
  labels: labelsProp = defaultLabel,
}) => {
  const api = useStorybookApi();

  const labelNames = useMemo<string[]>(() => {
    const extractStories = (subject: Story | Group): Story[] =>
      isStory(subject)
        ? [subject]
        : flatMap(subject.children || [], (c) =>
            extractStories(api.resolveStory(c) as Story | Group)
          );

    if (isFunction(labelsProp)) {
      const story = api.getCurrentStoryData();
      return flatMap(extractStories(story), labelsProp);
    } else {
      return labelsProp;
    }
  }, [api, labelsProp]);

  const [loading, setLoading] = useState(true);

  const [labels, setLabels] = useState<Label[]>([]);

  const [issues, setIssues] = useState<IssueProps[]>([]);

  const [owner, repo] = repository.split('/', 2);

  const graphqlWithAuth = useMemo(
    () =>
      graphql.defaults({
        headers: {
          authorization: `token ${token}`,
        },
      }),
    [token]
  );

  useEffect(() => {
    setLoading(true);
    graphqlWithAuth({
      query: `
        query Issues($owner: String!, $repo: String!, $labels: [String!], $labelString: String!) {
          repository(owner: $owner, name: $repo) {
            issues(first: 100, filterBy: { states: [OPEN], labels: $labels }) {
              nodes {
                id
                number
                title
                url
              }
            }
            labels(first: 100, query: $labelString) {
              nodes {
                name
                color
              }
            }
          }
        }
      `,
      owner,
      repo,
      labels: labelNames,
      labelString: labelNames.join(' '),
    }).then(({ repository: { issues, labels } }) => {
      setIssues(issues.nodes);
      setLabels(labels.nodes);
      setLoading(false);
    });
  }, [graphqlWithAuth, labelNames, owner, repo]);

  if (loading) return <Spinner />;

  return (
    <ConfigurationContext.Provider value={{ labels, repository, token }}>
      {issues.length ? <IssueList issues={issues} /> : <NoIssues />}
    </ConfigurationContext.Provider>
  );
};

export default Issues;
