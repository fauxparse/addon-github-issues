import React, { useMemo } from 'react';
import { TagItem } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import contrast from './contrast';

export type LabelProps = {
  name: string;
  color: string;
};

const LabelTag = styled(TagItem)();

const Label: React.FC<LabelProps> = ({ name, color }) => {
  const [background, foreground] = useMemo(() => {
    const c = `#${color}`;
    return [c, contrast({ background: c })];
  }, [color]);
  return <LabelTag style={{ backgroundColor: background, color: foreground }}>{name}</LabelTag>;
};

export default Label;
