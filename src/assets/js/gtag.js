const gtag = window.gtag;

/**
 * GA 事件
 * @param {String} category 分類
 * @param {String} name 文章名字
 * @param {String} variant 文章tag
 */
const gtagEvent = (url, category, name, variant = '') => {
    gtag('event', 'purchase', {
        value: 10,
        currency: 'NTD',
        items: [{
            item_url: url,
            item_name: name,
            item_category: category,
            item_variant: variant
        }]
    });
};

export default gtagEvent;
