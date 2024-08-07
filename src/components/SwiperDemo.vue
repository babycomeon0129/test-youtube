<template>
    <section>
        <swiper-container
            navigation="true"
            :pagination-dynamic-bullets="true"
            class="mySwiper"
        >
            <swiper-slide v-for="slide in slideList" :key="slide">
                Slide {{ slide }}
            </swiper-slide>
        </swiper-container>

    </section>
</template>

<script setup>
import { register } from 'swiper/element/bundle';

register();

const slideList = ['1', '2', '3', '4', '5'];

</script>