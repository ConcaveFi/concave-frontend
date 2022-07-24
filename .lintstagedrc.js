const path = require('path')

const getEslintFixCmd =
  ({ cwd = process.cwd(), rules, fix, cache, maxWarnings }) =>
  (files) => {
    const args = [
      cache ? '--cache' : '',
      fix ? '--fix' : '',
      maxWarnings !== undefined ? `--max-warnings=${maxWarnings}` : '',
      rules !== undefined ? '--rule ' + rules.map((r) => `"${r}"`).join('--rule ') : '',
      files
        // makes output cleaner by removing absolute paths from filenames
        .map((f) => path.relative(cwd, f))
        .map((f) => `"./${f}"`)
        .join(' '),
    ].join(' ')
    return `eslint ${args}`
  }

module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    getEslintFixCmd({
      fix: true,
      cache: true,
      // when autofixing staged-files disable react-hooks/exhaustive-deps,
      // a change here can potentially break things without proper visibility
      rules: ['react-hooks/exhaustive-deps: off'],
      maxWarnings: 0, //👌🏼
    }),
    'yarn format',
  ],
}
