import React from 'react';
import { useParameter } from '@storybook/api';
import { styled } from '@storybook/theming';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import { PARAM_KEY } from '../constants';
import { Configuration } from './configuration';
import Issues from './Issues';
import MissingConfiguration from './MissingConfiguration';

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: '4rem 20px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  position: 'relative',
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const isCorrectConfiguration = (parameter: unknown): parameter is Configuration => {
  if (!isObject(parameter)) return false;
  if (!has(parameter, 'repository') || !has(parameter, 'token')) return false;
  if (!(parameter as Configuration).repository?.match(/^[^/]+\/[^/]+/)) return false;
  return true;
};

export const TabContent: React.FC = () => {
  const parameter = useParameter(PARAM_KEY);
  if (!isCorrectConfiguration(parameter)) {
    return <MissingConfiguration />;
  }

  return (
    <TabWrapper>
      <TabInner>
        <Issues {...parameter} />
      </TabInner>
    </TabWrapper>
  );
};
