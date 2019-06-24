# The Blue Alliance Progressive Web App (PWA)

[![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/the-blue-alliance/the-blue-alliance-pwa)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/the-blue-alliance/the-blue-alliance-pwa)
[![Coverage Status](https://img.shields.io/codecov/c/github/the-blue-alliance/the-blue-alliance-pwa/master.svg)](https://codecov.io/gh/the-blue-alliance/the-blue-alliance-pwa/branch/master)

A universally (server + client) rendered React PWA for The Blue Alliance.

Currently at https://beta.thebluealliance.com

## Getting started

Fill out `.env.sample` and save it as `.env`.

`npm install` to install packages.

`npm run dev` to run the app in development mode at [http://localhost:3000](http://localhost:3000).

`npm run lint` to run lint checks.

`npm run test` to run all tests.

`npm run test:watch` to run tests in watch mode to run tests related to changed files every time a file is saved.

`npm run analyze` to analyze bundle size.

`npm run build` to build for production.

`npm run deploy` to deploy to production.

`npm start` to run the production server at port 3001 (or a specified PORT).

## Developer notes

We use [Husky](https://github.com/typicode/husky) to manage Git hooks.
In particular, Prettier and ESlint are used to format and lint code during pre-commit.
We recommend installing text editor plugins for [Prettier](https://prettier.io/docs/en/editors.html) and [ESlint](https://eslint.org/docs/user-guide/integrations) to automatically format code and warn about any
errors during development.

## Made with

- [React](https://github.com/facebook/react)
- [Next.js](https://github.com/zeit/next.js)
- [Material UI](https://github.com/mui-org/material-ui)
