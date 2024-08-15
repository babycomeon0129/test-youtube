const formatter = (num) => {
    const formatter = new Intl.NumberFormat('zh-Hant-TW', {
        /** decimal：純數字 currency：貨幣 percent：百分比 unit：單位 */
        style: 'decimal',
        currency: 'TWD',
        minimumFractionDigits: 0
    });
    return formatter.format(num);
}

export { formatter };