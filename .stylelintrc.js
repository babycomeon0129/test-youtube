module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        // 分號結尾
        'semi': ['error', 'always'],
        // 縮排為4個字元
        'indent': ['error', 4],
        // 預設雙引號，警告使用單引號，會引導使用雙引號
        'quotes': ['warn', 'double', { 'avoidEscape': true }],
        // 物件屬性後面加逗號
        'comma-dangle': ['error', 'always-multiline'],
        // 函式名與括號之間空格，括號前後加空格
        'space-before-function-paren': ['error', 'always'],
        'space-in-parens': ['error', 'always'],
        // 屬性自動折行
        'object-property-newline': ['error', { 'allowMultiplePropertiesPerLine': false }],
        // 函式與函式之間空行分隔
        'padding-line-between-statements': [
            'error',
            { 'blankLine': 'always', 'prev': 'function', 'next': 'function' }
        ],
        // Vue HTML 標籤的縮排為 4 個字元
        'vue/html-indent': ['error', 4],
        // 移除行末尾的多餘空白
        'no-trailing-spaces': ['error'],
        // 移除多餘的空行，最大允許1行
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
    }
};
