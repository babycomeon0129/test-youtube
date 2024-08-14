<template>
    <div class="home">
        <div class="container">
            <div class="video">
                <div v-if="mainVideo?.contentDetails?.videoId" class="main__video">
                    <div class="main__video__wrapper">
                        <iframe
                            :src="`https://www.youtube.com/embed/${mainVideo.contentDetails.videoId}?autoplay=1&mute=1&enablejsapi=1&loop=1&playlist=${mainVideo.contentDetails.videoId}`"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />
                    </div>
                    <h2>{{ mainVideo.snippet.title }}</h2>
                    <div class="main__video__info">
                        <div class="main__video__detail">
                            <img
                                src="https://yt3.ggpht.com/ytc/AIdro_lyTTRW4D3tELjeHN6WHC9F3En7wqhcN4-6rpPivkR2SZg=s48-c-k-c0x00ffffff-no-rj" />
                            <div>{{ mainVideo.snippet.channelTitle }}</div>
                        </div>
                        <div class="main__video__description">
                            {{ mainVideo.snippet.description }}
                        </div>
                    </div>
                </div>
                <div class="video__list">
                    <div v-for="(video, index) in videoList" :key="video.id" class="video__list__wrapper"
                        @click="clickTag(video)">
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
            <hr />
            <h2>{{ testList.length }} 則留言</h2>
            <ul class="user__list">
                <li v-for="test in testList" :key="test.time">
                    <img :src="test.image" />
                    <div class="user__info">
                        <div class="user__name">{{ test.name }}<span>-{{ test.time }}</span></div>
                        <div>{{ test.message }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

let videoList = ref(null);
let mainVideo = ref(null);
let messageList = ref([]);


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
    getMessageList(res.data.items[0].id);
}

const getMessageList = async (id) => {
    try {
        let res = await axios.get('https://youtube.googleapis.com/youtube/v3/comments', {
            params: {
                part: 'id,snippet',
                parentId: id,
                key: 'AIzaSyB2C72BoGuN4_KmG0-cLf5yiOgsMFLu4XU'
            }
        })

        console.log(res);
    }
    catch(error) {
        console.log(error);
    }
}

const clickTag = video => {
    mainVideo.value = video;
    getMessageList(mainVideo.value.id);
};

getData();


const testList = [
    {
        name: '@user-hn1so1vq1m',
        time: '1分鐘',
        image: 'https://randomuser.me/api/portraits/women/31.jpg',
        message: '太陽落下、升起，這裡的一天只有兩分十秒。穿著草莓裝的年輕人，縮腿蹲踞在像是聖修伯里小王子象徵自我性格的星球上，星球有一半以上淹沒在灰白色的世俗洪流中，只有在螢幕中央這塊被草莓火山圍繞、在洪流中探出頭來的丘陵，我們才能仰望星空、我們才能踩在這塊淨土的肚臍眼上，自溺地踮腳抬腿、緩緩旋轉跳躍，累了就倒臥一旁，我們最多就是這樣，享受這個專屬密境中的小確幸，被生活覆蓋夢想和希望。我們不知道自己站的土地是不是一個國、我們不知道自己賺的錢買不買得起一個家、我們不知道自己還要憋氣多久才能不再妥協、浮出海面大聲吶喊。03:45 閃電驟雨打下的瞬間，太陽消失'
    },
    {
        name: '@user-hn1so1vq1m',
        time: '3小時',
        image: 'https://randomuser.me/api/portraits/women/32.jpg',
        message: '近年台灣的獨立樂團有讓人在這愛來愛去的流行歌海中耳目一新 茄子蛋 美秀集團 老王樂隊和好樂團都很驚人或許能給人更多感觸的是關於一些社會議題的曲台灣經濟衰退 多少年輕人被一些當初搭上經濟起飛順風車的既得利益者嘲諷 殊不知這是時代的悲劇'
    },
    {
        name: '@user-hn1so1vq1m',
        time: '4天前',
        image: 'https://randomuser.me/api/portraits/men/31.jpg',
        message: '我是個躁鬱症患者，長期被鬱症所困擾著，不能言語的正常、行動的自如，但就在最近最近聽到了這首歌，聽了一個禮拜的我，覺得心靈有一塊地被滋養，變得有動力，更認真的去做我愛的事。這是這三年來沒發生過的事。謝謝你們！！！我愛這首歌'
    },

    {
        name: '@user-hn1so1vq1m',
        time: '6年前',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
        message: '很感謝這首歌的出現，即使自己非常非常努力了，卻始終跟不上，也做不好，最近狀態非常憂鬱，什麼動力都沒有，跟著唱了很多次這首歌之後，我卻再次擁有了動力去面對這個現實社會。'
    },
    {
        name: '@user-hn1so1vq1m',
        time: '8年前',
        image: 'https://randomuser.me/api/portraits/men/34.jpg',
        message: '太陽落下、升起，這裡的一天只有兩分十秒。穿著草莓裝的年輕人，縮腿蹲踞在像是聖修伯里小王子象徵自我性格的星球上，星球有一半以上淹沒在灰白色的世俗洪流中，只有在螢幕中央這塊被草莓火山圍繞、在洪流中探出頭來的丘陵，我們才能仰望星空、我們才能踩在這塊淨土的肚臍眼上，自溺地踮腳抬腿、緩緩旋轉跳躍，累了就倒臥一旁，我們最多就是這樣，享受這個專屬密境中的小確幸，被生活覆蓋夢想和希望。我們不知道自己站的土地是不是一個國、我們不知道自己賺的錢買不買得起一個家、我們不知道自己還要憋氣多久才能不再妥協、浮出海面大聲吶喊。03:45 閃電驟雨打下的瞬間，太陽消失'
    },
    {
        name: '@user-hn1so1vq1m',
        time: '10年前',
        image: 'https://randomuser.me/api/portraits/women/35.jpg',
        message: '太陽落下、升起，這裡的一天只有兩分十秒。穿著草莓裝的年輕人，縮腿蹲踞在像是聖修伯里小王子象徵自我性格的星球上，星球有一半以上淹沒在灰白色的世俗洪流中，只有在螢幕中央這塊被草莓火山圍繞、在洪流中探出頭來的丘陵，我們才能仰望星空、我們才能踩在這塊淨土的肚臍眼上，自溺地踮腳抬腿、緩緩旋轉跳躍，累了就倒臥一旁，我們最多就是這樣，享受這個專屬密境中的小確幸，被生活覆蓋夢想和希望。我們不知道自己站的土地是不是一個國、我們不知道自己賺的錢買不買得起一個家、我們不知道自己還要憋氣多久才能不再妥協、浮出海面大聲吶喊。03:45 閃電驟雨打下的瞬間，太陽消失'
    },
]



</script>

<style lang="scss" scoped>
@import '@/styles/home';
</style>
