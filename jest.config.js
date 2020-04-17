module.exports = {
  transform: {
    "^.+\\.[t|j]s$": ["babel-jest", {configFile: require.resolve("./.babelrc")}],
  },
};
