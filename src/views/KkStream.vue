<template>
    <div class="home">
        KK STREAM

        <div
            id="testKK"
            class="testKK"
        />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';

const getVideoId = async() => {
	try {
		let res = await axios.post('https://apis.businessweekly.com.tw/Content/Native/1/api/Content/GetAudio/', {
			'siteNo':10,                //商周
			'cache':'n',
			'status':'n',
			'Type':13,
			'AudioNo':3001       // 一部KK測試影片
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		console.log(res);
	}
	catch(error) {
		console.error(error);
	}
};

console.log(123);

getVideoId();
onMounted(() => {
	window.playerData = {
		vBrand: 'blendvision',
		videoId: '43c92205-52af-4d30-b005-d5433c3fea73',
		vType: 'video',
		memberId: '123456',
		vEl: 'testKK',
		vTitle: 'TEST TITLE',
	};

	document.addEventListener('DOMContentLoaded', async function () {
		await window.kkBlendVisionApi(window.playerData);
	});

});
</script>

<style lang="scss" scoped>
@import '@/styles/home';

.testKK {
	width: 100% !important;
    height: auto !important;
    aspect-ratio: 16 / 9;
    max-width: 800px;

}
</style>