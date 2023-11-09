// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests
// chore: Typically used for small tasks and maintenance work that doesn't fall into the other categories. Chore commits might include tasks like updating dependencies, cleaning up code, or minor code organization.
// revert: Used when reverting a previous commit or a series of commits. The commit message should reference the commit being reverted.
// translation: Used for commits related to translating text or content, such as adding or updating translations in different languages.
// security: Reserved for commits related to security enhancements, fixes, or updates. This can include vulnerability patches or security-related changes.
// events: If you're tracking changes related to event handling or event-driven programming, you can use this type to describe those changes.
// migrate: This type can be used when you're migrating or transitioning from one technology, framework, or system to another.

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feature',
        'fix',
        'performance',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'standard',
        'events',
        'migrate',
      ],
    ],
  },
}
