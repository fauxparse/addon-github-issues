import React from 'react';
import { styled } from '@storybook/theming';

const VerticallyCentred = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
}));

const Box = styled.div(({ theme }) => ({
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.appBorderRadius,
  backgroundColor: theme.background.app,
  padding: 23,
  maxWidth: 768,
}));

const Error: React.FC = ({ children, ...props }) => {
  return (
    <VerticallyCentred>
      <Box {...props}>{children}</Box>
    </VerticallyCentred>
  );
};

export default Error;
