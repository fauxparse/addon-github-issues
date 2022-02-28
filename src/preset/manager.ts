import { addons, types } from '@storybook/addons';

import { ADDON_ID, TAB_ID } from '../constants';
import { Tab } from '../Tab';

addons.register(ADDON_ID, () => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: 'Issues',
    route: ({ storyId }) => `/issues/${storyId}`,
    match: ({ viewMode }) => viewMode === 'issues',
    render: Tab,
  });
});
