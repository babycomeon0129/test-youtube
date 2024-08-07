<template>
    <section class="kv">
    </section>
</template>

<style lang="scss" scoped>
.kv {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/kv.jpeg') no-repeat;
    background-size: cover;

    @media (max-width: 767px) {
        background: url('@/assets/images/kv__mb.png') no-repeat;
        background-size: cover;
    }
}
</style>
