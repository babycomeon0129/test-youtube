<template>
    <div class="home">
        <div class="container">
            <div class="video">
                <div v-if="mainVideo?.snippet.resourceId.videoId" class="main__video">
                    <div class="main__video__wrapper">
                        <iframe
                            :src="`https://www.youtube.com/embed/${mainVideo.snippet.resourceId.videoId}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${mainVideo.snippet.resourceId.videoId}`"
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
                        <div>頻道簡介： {{ channelsData.snippet.description }}</div>
                        <div>頻道影片數： {{ formatter(channelsData.statistics.videoCount) }}</div>
                        <div>頻道訂閱數： {{ formatter(channelsData.statistics.subscriberCount) }}</div>
                        <div>頻道觀看數： {{ formatter(channelsData.statistics.viewCount) }}</div>
                        <div>影片發佈日期：{{ videoData?.snippet.publishedAt }}</div>
                        <div v-if="videoData">影片觀看數： {{ formatter(videoData.statistics.viewCount) }}</div>
                        <div v-if="videoData">影片按讚數： {{ formatter(videoData.statistics.likeCount) }}</div>
                        <hr />
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
                    <div class="user__wrapper">
                        <img :src="threads.snippet.topLevelComment.snippet.authorProfileImageUrl" />
                        <div class="user__info">
                            <div class="user__name">
                                {{ threads.snippet.topLevelComment.snippet.authorDisplayName }}
                                <span>- {{ threads.snippet.topLevelComment.snippet.publishedAt }}</span>
                                <span>- 按讚數：{{ threads.snippet.topLevelComment.snippet.likeCount }}</span>
                            </div>
                            <div v-html="threads.snippet.topLevelComment.snippet.textDisplay"></div>
                        </div>
                    </div>
                    <div v-if="threads.replies" class="user__replies">
                        回覆數：{{ threads.replies.comments.length }}
                        <ul>
                            <li v-for="replies in threads.replies.comments">
                                <img :src="replies.snippet.authorProfileImageUrl" />
                                <div class="user__info">
                                    <div class="user__name">
                                        {{ replies.snippet.authorDisplayName }}
                                        <span>- {{ replies.snippet.publishedAt }}</span>
                                        <span>- 按讚數：{{ replies.snippet.likeCount }}</span>
                                    </div>
                                    <div v-html="replies.snippet.textDisplay"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatter } from '@/assets/js/common.js';
import axios from 'axios';

const APIKey = 'AIzaSyB2C72BoGuN4_KmG0-cLf5yiOgsMFLu4XU';

const youtubeAccount = '@bwnet';
let videoList = ref(null);
let mainVideo = ref(null);
let channelsData = ref(null);
let commentThreadsList = ref([]);
let videoData = ref(null);

const getChannelsData = async () => {
    try {
        let res = await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'id,snippet,statistics',
                forHandle: youtubeAccount,
                key: APIKey,
            },
        });

        channelsData.value = res.data.items[0];
        getAllPlayList();

    } catch (error) {
        console.log(error);
    }
};

const getPlaylistItems = async () => {
    let res = await axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems', {
        params: {
            part: 'id,snippet',
            maxResults: 20, // 可接受的值為 0 到 50 (含頭尾)。預設值為 5。
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
                id: computed(() => mainVideo.value.snippet.resourceId.videoId).value,
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
                part: 'id,snippet,replies',
                videoId: computed(() => mainVideo.value.snippet.resourceId.videoId).value,
                maxResults: 50,
                key: APIKey,
            },
        });

        commentThreadsList.value = res.data.items;
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};

const getAllPlayList = async () => {
    try {
        let res = await axios.get('https://youtube.googleapis.com/youtube/v3/playlists', {
            params: {
                part: 'contentDetails,id,localizations,player,snippet,status',
                channelId: computed(() => channelsData.value.id).value,
                // id: 'UUwlpC8vX_GkRngPYSnwkJxg',
                maxResults: 50, // 可接受的值為 0 到 50 (含頭尾)。預設值為 5。
                key: APIKey,
            },
        });
        console.log('播放清單：');
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
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
