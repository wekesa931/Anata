# Scribe 2 ![Tests](https://github.com/antarahealth/scribe2/workflows/CI/badge.svg?branch=master)

This is a React app pulls data from Airtable and provides a simpler UI for our clinicians to use in their day to day activities.

# Development

1. git clone `git@github.com:antarahealth/hn-dashboard.git`
2. run `cd hn-dahsboard && npm install`
3. Create a new `.env` on the root dir and add the required variables from `.env.example`.
4. run `npm start`

# Tests

We use [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests. To run tests: `npm run test` or `npm run test:watch` in watch mode.

# Release

After your PR is reviewed and approved, it can be merged into the master branch. The `master` branch autodeploys to [beta](hn-dashboard-beta.herokuapp.com) where we could test your feture with other features altogether. When we have a bunch of features ready and want to deploy to our users, we then head over to our Heroku dashboard and manually deploy the master branch on the production app in the [pipeline](https://dashboard.heroku.com/pipelines/0a14a346-098f-4411-b64c-dfb0198da040).
