# Scribe 2 ![Tests](https://github.com/antarahealth/scribe2/workflows/CI/badge.svg?branch=master)

![Coverage](./badges/badge-branches.svg)   
![Coverage](./badges/badge-functions.svg)   
![Coverage](./badges/badge-lines.svg)  
![Coverage](./badges/badge-statements.svg)

This is a React app pulls data from Airtable and provides a simpler UI for our clinicians to use in their day to day activities.

# Development

1. Get or create your Github [access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) and add it in your `.zshrc` or `.bashprofile` as an environment variable with `export NPM_TOKEN=<github_access_toke>`. (_This token to install our custom npm libraries from our private npm registry_). Once set, test it using `echo $NPM_TOKEN`.
2. Run `git clone git@github.com:antarahealth/scribe2.git`
3. Login to the npm repository by running `npm login --registry=https://npm.pkg.github.com` When asked for the credentials to login in for npm. Use your github login details however use the **access-token** that you had generated as your password..
4. then run `cd scribe2 && npm install`
5. Create a new `.env` on the root dir and add the required variables from `.env.example`. The environment variables can be accessed [here](https://antara.1password.com/vaults/vlce5zlfjwpfukscylhotjfbga/allitems/2xfh2jcgdj4y6hfelfe3h2hf3a)
6. run `npm run dev`

# Tests

We use [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests. To run tests: `npm run test` or `npm run test:watch` in watch mode.

# Coverage reports 
We use [jest](https://jestjs.io/) to generate coverage reports on the lines, branches, statements and functions coverage and [jest-coverage-badges](https://github.com/pamepeixinho/jest-coverage-badges)

Install the package globally if not available
```bash
 sudo npm install --location=global jest-coverage-badges
```
To generate the coverage badges for the reports. To generate the coverage run 
```bash
 npm run test:badges  
 jest-coverage-badges --output "./badges" 
```

# Release

After your PR is reviewed and approved, it can be merged into the master branch. The `master` branch autodeploys to

1. Test - This [deployment](hn-dashboard-test.herokuapp.com) the HNOS test [backend](https://antara-hnos-test.herokuapp.com/graphql/). This helps us test the frontend features with backend that has not been deployed to production.
2. Beta - This [deployment](hn-dashboard-beta.herokuapp.com) uses prod environment variables where we could test your feture with other features altogether just the way they would behave in production.

## Deploying to production ⚠️

`Note: You must have rights to push to`master`before you can deploy.`

When we have a bunch of features ready and merged to master and want to deploy to our users:

We use [release-it ](https://github.com/release-it/release-it) to automate releasing on Github, so check out master locally.

Pull the latest changes and then run `npm run release`. This commands does the following things automatically (be very sure you want to deploy when you run it ⚠️):

1. Updates your package.json to have the new version number.
2. It also automatically updates the CHANGELOG.md with the all commits since the last release.
3. `git add` and `git commit` that change, with a commit message of v1.0.0 (or similar)
4. Creates an annotated git tag named v1.0.0 whose message is v1.0.0
5. Runs any prepublish or prepublishOnly scripts in the package.json. See https://docs.npmjs.com/misc/scripts
6. Pushes the tag to github via `git push --follow-tags`.
7. Creates a new release for that tag with the release notes automatically generated via `auto-changelog`.

After a successful github release, this [Github action](.github/workflows/deploy.yml) is triggered to deploy the app to production on heroku.

# Design

The designs are hosted on [figma](https://www.figma.com/file/zoM5pHUmM8SKHQQSyOfVkV/HN-Dashboard?node-id=574%3A1) and the styleguide is on [Coda](https://coda.io/d/Design-System_d7jJWI59uLp/Meeting-Notes_sub2f#_lukZq).

# Gotchas

Have a look at the below for some problems you might face as you do set-up. Also please remember to enlarge this list as you encounter issues.

- When doing doing `npm i` you might face **npm dependency tree error** in that case run `npm install --cache /tmp/empty-cache --legacy-peer-deps` This issue is due to npm 7 and node 16 check this [post](https://stackoverflow.com/questions/65549858/eresolve-unable-to-resolve-dependency-tree-when-installing-npm-react-facebook) for more insight.
- on setting up your `NODE_PROXY_URL` environment variable use the **local version**
  you can get this environment variables on [here]- (https://my.1password.com/vaults/vlce5zlfjwpfukscylhotjfbga/allitems/2xfh2jcgdj4y6hfelfe3h2hf3a).
