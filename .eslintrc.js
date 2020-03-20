module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        'indent': [2, 4, { "SwitchCase": 1 }],//缩进风格
        "prettier/prettier": 0,
    },
};