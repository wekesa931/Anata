# Scribe 2 ![Tests](https://github.com/antarahealth/scribe2/workflows/CI/badge.svg?branch=master)

This is a React app pulls data from Airtable and provides a simpler UI for our clinicians to use in their day to day activities.

# Development

1. Get or create your Github [access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and add it in your `.zshrc` or `.bashprofile` as an environment variable with `export NPM_TOKEN=<github_access_toke>`. (_This token to install our custom npm libraries from our private npm registry_). Once set, test it using `echo $NPM_TOKEN`.
2. Run `git clone git@github.com:antarahealth/scribe2.git`
3. Login to the npm repository by running `npm login --registry=https://npm.pkg.github.com`
4. then run `cd hn-dahsboard && npm install`
5. Create a new `.env` on the root dir and add the required variables from `.env.example`. (Reach out to the team for the .env variables)
6. run `npm run dev`

# Tests

We use [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests. To run tests: `npm run test` or `npm run test:watch` in watch mode.

# Release

After your PR is reviewed and approved, it can be merged into the master branch. The `master` branch autodeploys to

1. Test - This [deployment](hn-dashboard-test.herokuapp.com) the HNOS test [backend](https://antara-hnos-test.herokuapp.com/graphql/). This helps us test the frontend features with backend that has not been deployed to production.
2. Beta - This [deployment](hn-dashboard-beta.herokuapp.com) uses prod environment variables where we could test your feture with other features altogether just the way they would behave in production.

When we have a bunch of features ready and want to deploy to our users, we then head over to our Heroku dashboard and **manually** deploy the master branch on the production app in the [pipeline](https://dashboard.heroku.com/pipelines/0a14a346-098f-4411-b64c-dfb0198da040).

# Design

The designs are hosted on [figma](https://www.figma.com/file/zoM5pHUmM8SKHQQSyOfVkV/HN-Dashboard?node-id=574%3A1) and the styleguide is on [Coda](https://coda.io/d/Design-System_d7jJWI59uLp/Meeting-Notes_sub2f#_lukZq).
