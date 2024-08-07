module.exports = {
    extends: [
        "stylelint-config-pixnet",
        "stylelint-config-html/vue"
    ],
    rules: {
        'indentation': 4,
        'selector-pseudo-element-no-unknown':
            [true, { ignorePseudoElements: ['v-deep'] }],
        'selector-pseudo-class-no-unknown':
            [true, { ignorePseudoClasses: ['global', 'deep'] }]
    }
}