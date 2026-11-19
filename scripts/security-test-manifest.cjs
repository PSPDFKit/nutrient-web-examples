module.exports = {
  "tests/webpack-middleware.test.cjs": [
    "gatsbyjs middleware rejects traversal outside webpack output",
    "gatsbyjs ordinary middleware responses",
    "pending stream open observer detects failed opens and closed descriptors",
    "react middleware rejects traversal outside webpack output",
    "react ordinary middleware responses",
    "react redirects omit cross-realm sensitive headers",
  ],
  "tests/middleware-length.test.cjs": [
    "gatsbyjs stream length uses selected size without another lookup",
    "react stream length uses selected size without another lookup",
  ],
  "tests/dependency-install.test.cjs": [
    "gatsbyjs follow-redirects versions are patched",
    "gatsbyjs postinstall fails on an incompatible patch without CI",
    "react follow-redirects versions are patched",
    "react postinstall fails on an incompatible patch without CI",
    "postinstall failure requires a completed nonzero exit",
    "React development server disables the incompatible magic HTML helper",
  ],
  "tests/security-runner.test.cjs": [
    "required test runner rejects missing, skipped, todo, failed and duplicate results",
    "required test runner fails when its event stream closes before end",
  ],
};
