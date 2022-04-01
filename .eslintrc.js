module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
