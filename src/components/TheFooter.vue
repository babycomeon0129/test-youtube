<template>
    <footer>Copyright © 2024 <img src="@/assets/images/logo_pixnet.svg" />優像數位媒體科技 ( 股 ) 公司</footer>
</template>

<style lang="scss" scoped>
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 28px 0;
    font-size: 14px;
    color: #fff;
    background: #000;

    @media (max-width: 767px) {
        padding: 12px 0;
        font-size: 12px;
        line-height: 16px;
    }

    img {
        margin: 0 0.5em;
    }
}
</style>
