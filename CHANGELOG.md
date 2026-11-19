# Changelog

## Unreleased

- Disable the incompatible optional magic HTML helper in the React development server. Normal viewer and asset requests are unaffected; extensionless helper URLs no longer produce helper HTML.

- Fix development-server path traversal and redirect header exposure in the Gatsby and React examples.
- Correct one-byte and range responses and close unused HEAD request streams in the Gatsby and React development servers. These examples are tested with Node.js 24.
