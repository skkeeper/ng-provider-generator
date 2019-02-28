module.exports = {
  moduleDirectories: ['node_modules', 'lib'],
  testPathIgnorePatterns: [
    "/dist/"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
