module.exports = {
  "env": {
      "commonjs": true,
      "es6": true,
      "node": true
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  //we can also extend oclif
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
      "no-unused-vars": ["warn", {"args": "none"}],
      "prettier/prettier": ["warn"]
  }
};