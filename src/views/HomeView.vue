<template>
    <div class="home">
        <div class="container">
            <div class="main__video">
                <div class="main__video__wrapper">
                    <iframe
                        :src="`https://www.youtube.com/embed/${mainVideo.contentDetails.videoId}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${mainVideo.contentDetails.videoId}`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    />
                </div>
                <h2>{{ mainVideo.snippet.title }}</h2>
                <div class="main__video__info">
                    <div class="main__video__detail">
                        <img src="https://yt3.ggpht.com/ytc/AIdro_lyTTRW4D3tELjeHN6WHC9F3En7wqhcN4-6rpPivkR2SZg=s48-c-k-c0x00ffffff-no-rj" />
                        <div>{{ mainVideo.snippet.channelTitle }}</div>
                    </div>
                    <div class="main__video__description">
                        {{ mainVideo.snippet.description }}
                    </div>
                </div>
            </div>
            <div class="video__list">
                <div
                    v-for="(video, index) in videoList"
                    :key="video.id"
                    class="video__list__wrapper"
                    @click="clickTag(video)"
                >
                    <template v-if="index !== 0">
                        <div class="video__image">
                            <img :src="video.snippet.thumbnails.default.url" />
                        </div>
                        <div class="video__list__info">
                            <div class="video__list__tite">{{ video.snippet.title }}</div>
                            <div>{{ video.snippet.channelTitle }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

let videoList = ref(null);
let mainVideo = ref(null);


const getData = async () => {
    let res = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems', {
        params: {
            part: 'contentDetails,id,snippet,status',
            maxResults: 20,
            playlistId: 'PLxdm6JxBd9NN_e_66y64vsIvmAtiVCkOK',
            key: 'AIzaSyB2C72BoGuN4_KmG0-cLf5yiOgsMFLu4XU'
        }
    });

    videoList.value = res.data.items;
    mainVideo.value = videoList.value.shift();
    console.log(res.data.items[0]);
}

const clickTag = video => mainVideo.value = video;
getData();



</script>

<style lang="scss" scoped>@import '@/styles/home';</style>
