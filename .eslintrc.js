module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "angular": true,
        "$": true,
        "describe": true,
        "it": true,
        "spyOn": true,
        "beforeEach": true,
        "expect": true,
    },
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread ": true
        }
    },
    "rules": {
        "comma-dangle": [ 1, "only-multiline" ],
        "indent": [ 2, 2 ],
        // "linebreak-style": [ 2, "windows" ],
        "linebreak-style": 0,
        "no-console": 1,
        "no-empty": 1,
        "no-unused-vars": 1,
        "no-var": 2,
        "quotes": [ 2, "single" ],
        "semi": [ 2, "always" ],
    }
};
