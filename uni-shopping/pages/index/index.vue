<template>
	<view id="main" >
		<view style="width: 100%;height: 80upx;background-color: white;position: fixed;top: 0;z-index: 2;"></view>
		<view style="width: 100%;height: 80upx;"></view>
		<!-- 顶部固定定位 -->
		<view class="top">
			<view><image class="img" src="../../static/img-index/massage.png"/></view>
			<view class="top_con" @click="toSeek">
				<view><image class="img" src="../../static/img-index/seek.png" /></view>
				<view>智能积木 越野四驱车</view>
			</view>
			<view><image @click="scan" class="img" src="../../static/img-index/ewm.png"/></view>
		</view>
		<view style="width: 100%;height: 80upx;"></view>
		<!-- 滑动显示部分 -->
		<view class="context">
			<scroll-view scroll-with-animation scroll-x="true" :scroll-into-view="scrid">
				<view class="scroll_data" :id="'scroll'+index" v-for="(item,index) in slidingData" :key="index" @click="cliswiper(index)" >
					<view :class="index==swipernum?'view':''">{{item.name}}</view>
				</view>
			</scroll-view>
			<view style="width:100%;height: 66upx;"></view>
			
			<swiper class="aa" :current="swipernum" @change="silSwiper" >
				<swiper-item v-for="(item,index) in slidingData" :key="index" ><index-first /></swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import indexFirst from '@/components/indexFirst/indexFirst.vue'
	export default {
		data() {
			return {
				slidingData:[], // ---------------滑动数据
				scrid:"", // ---------------------滑动scroll位置的id
				swipernum:0, // ------------------滑动样式
			}
		},
		onLoad() {
			uni.request({url:"http://ceshi3.dishait.cn/api/index_category/data"}).then(res=>{
				this.slidingData = res[1].data.data.category // ----------------将滑动数据添加到data中
			})
		},
		mounted() {
			let music = uni.getBackgroundAudioManager()
			music.src = 'http://isure.stream.qqmusic.qq.com/C400003Y7RNa3SUPmm.m4a?guid=5166686209&vkey=8D289AF3F95B3FBC8900FABE82B5A0E2007C794C1EED7325B8EC22D794C0BEC5C8BDDD70B40A9D35473894B6F4BA604131157D92DD2DF9A1&uin=0&fromtag=66'
			music.startTime = 4.1
			music.title = "backMusic"
		},
		methods: {
			cliswiper(index){ // 点击滑块切换
				this.swipernum = index
			},
			silSwiper(e){ // 滑动swiper的监听
				this.swipernum = e.detail.current // 改变滑块样式的下标
				if(e.detail.current==0){
					this.scrid = "scroll"+(e.detail.current)
				}else if(e.detail.current==1){
					this.scrid = "scroll"+(e.detail.current-1)
				}else{
					this.scrid = "scroll"+(e.detail.current-2)
				}
			},
			toSeek(){ // 跳转至搜索页面
				uni.navigateTo({url:"../seek/seek"})
			},
			scan(){ // 扫码
				uni.scanCode({
					onlyFromCamera:false,
					scanType:'qrCode',
				}).then(res=>{
					console.log(res)
				})
			}
		},
		components:{ // 将组件模块化
			indexFirst
			
		}
	}
</script>

<style scoped>
	/* 全局样式 */
	view,scroll-view,swiper,swiper-item{box-sizing: border-box;}
	#main{margin: 0upx;}
	.img{width: 100%;height: 100%;}
	
	/* 顶部固定定位样式 */
	.top{width:100%;height: 80upx;display: flex;justify-content: space-between;position: fixed;top: 80upx;z-index: 2;background-color: white;padding:10upx 0;}
	.top>view:first-child{width: 50upx;height: 50upx;margin: auto 10upx;}
	.top>view:last-child{width: 60upx;height: 60upx;margin: auto 10upx;}
	.top .top_con{width:580upx;height:100%;background-color: #F7F7F7;border-radius: 10upx;display: flex;}
	.top .top_con>view:first-child{width:40upx;height: 40upx;margin-top: 15upx;margin-left: 15upx;}
	.top .top_con>view:last-child{line-height: 2;font-size: 32upx;color: #D2D2D2;margin: aotu 10upx;margin-left: 10upx;}
	
	/* 滑动部分样式 */
	.context{width: 100%;}
	
	.context scroll-view{white-space: nowrap;width:100%;height: 66upx;position: fixed;top: 160upx;z-index: 2;background-color: white;}
	.context scroll-view .scroll_data{width:100%;height: 66upx;display: inline-block;width:20%;text-align: center;}
	.context scroll-view .scroll_data>view{line-height: 1.7;text-align: center;display: inline-block;color: #454545;border-bottom: 6upx solid #FFFFFF;padding-bottom: 12upx;font-size: 30rpx;}
	.context scroll-view .scroll_data .view{color: #FD6801;border-bottom-color:#FD6801;} /* 添加class后的样式 */
	
	.context swiper{width:100%;height: 3300upx;}
	.context swiper swiper-item{width:100%;height:3000upx;}
</style>
