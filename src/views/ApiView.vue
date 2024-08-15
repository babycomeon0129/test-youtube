<template>
    <div class="home">
        <div class="container">
            <div class="video">
                <div v-if="mainVideo?.contentDetails?.videoId" class="main__video">
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
                    <div v-if="channelsData" class="main__video__info">
                        <div class="main__video__detail">
                            <img :src="channelsData.snippet.thumbnails.default.url" />
                            <div>{{ mainVideo.snippet.channelTitle }}</div>
                        </div>
                        <div>頻道簡介： {{ channelsData.brandingSettings.channel.description }}</div>
                        <div>頻道訂閱數： {{ formatter(channelsData.statistics.subscriberCount) }}</div>
                        <div>頻道觀看數： {{ formatter(channelsData.statistics.viewCount) }}</div>
                        <div>影片發佈日期：{{ videoData?.snippet.publishedAt }}</div>
                        <div>影片觀看數： {{ formatter(videoData.statistics.viewCount) }}</div>
                        <div>影片按讚數： {{ formatter(videoData.statistics.likeCount) }}</div>
                        <hr />
                        <div class="main__video__description">
                            <div></div>
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
                                <div class="video__list__info__title">{{ video.snippet.channelTitle }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <hr />
            <h2>{{ commentThreadsList.length }} 則留言</h2>
            <ul class="user__list">
                <li v-for="threads in commentThreadsList" :key="threads.id">
                    <img :src="threads.snippet.topLevelComment.snippet.authorProfileImageUrl" />
                    <div class="user__info">
                        <div class="user__name">
                            {{ threads.snippet.topLevelComment.snippet.authorDisplayName
                            }}<span>-{{ threads.snippet.topLevelComment.snippet.publishedAt }}</span>
                        </div>
                        <div v-html="threads.snippet.topLevelComment.snippet.textDisplay"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const APIKey = 'AIzaSyB2C72BoGuN4_KmG0-cLf5yiOgsMFLu4XU';

let videoList = ref(null);
let mainVideo = ref(null);
let channelsData = ref(null);
let commentThreadsList = ref([]);
let videoData = ref(null);

const getChannelsData = async () => {
    try {
        let res = await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'brandingSettings,contentDetails,contentOwnerDetails,id,localizations,snippet,statistics,status,topicDetails',
                forHandle: '@bwnet',
                key: APIKey,
            },
        });

        channelsData.value = res.data.items[0];
    } catch (error) {
        console.log(error);
    }
};

const getPlaylistItems = async () => {
    let res = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems', {
        params: {
            part: 'contentDetails,id,snippet,status',
            maxResults: 20,
            playlistId: 'PLxdm6JxBd9NN_e_66y64vsIvmAtiVCkOK',
            key: APIKey,
        },
    });

    videoList.value = res.data.items;
    mainVideo.value = videoList.value[0];
    getVideoData();
    getCommentThreads();
};

const getVideoData = async () => {
    try {
        let res = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'contentDetails,id,snippet,statistics,topicDetails',
                id: computed(() => mainVideo.value.contentDetails?.videoId).value,
                key: APIKey,
            },
        });

        videoData.value = res.data.items[0];
    } catch (error) {
        console.log(error);
    }
};

const getCommentThreads = async () => {
    try {
        let res = await axios.get('https://youtube.googleapis.com/youtube/v3/commentThreads', {
            params: {
                part: 'id,snippet',
                videoId: computed(() => mainVideo.value.contentDetails?.videoId).value,
                key: APIKey,
            },
        });

        commentThreadsList.value = res.data.items;
        console.log(res.data.items);
    } catch (error) {
        console.log(error);
    }
};

const formatter = (num) => {
    const formatter = new Intl.NumberFormat('zh-Hant-TW', {
        /** decimal：純數字 currency：貨幣 percent：百分比 unit：單位 */
        style: 'decimal',
        currency: 'TWD',
        minimumFractionDigits: 0,
    });
    return formatter.format(num);
};

const clickTag = (video) => {
    mainVideo.value = video;
    getVideoData();
    getCommentThreads();
};

getChannelsData();
getPlaylistItems();
</script>

<style lang="scss" scoped>
@import '@/styles/home';
</style>
