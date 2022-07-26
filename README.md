# GitHub issues for Storybook

**Track issues logged against specific components in your repository**

## Getting Started

```sh
yarn add -D storybook-addon-github-issues
```

Add the following into your `.env` file:

```sh
GITHUB_REPOSITORY=username/repo
GITHUB_TOKEN=your_auth_token
```

...where `your_auth_token` is a [GitHub personal access token](https://github.com/settings/tokens)
with at least the `repo` scope. This will be used to access GitHub's GraphQL API to retrieve matching stories.

Add `storybook-addon-github-issues` to the `addons` list in `.storybook/main.js`.

In your `.storybook/preview.js`:

```javascript
addParameters({
  issues: {
    repository: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN,
  },
});
```

## Tagging stories

By default, issues must have labels matching the name of the story, in kebab case.
For example, if your component story is `Atoms/Button`, then you should tag your issues with `button`.
