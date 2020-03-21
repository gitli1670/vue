<template>
	<view id="main">
		<!-- 热门搜索 -->
		<view class="hot">
			<view>热门搜索</view>
			<view><image class="img" src="../../static/5f3293a0be8956d791bb2140df8d78e930ea9611.jpg@1320w_742h.webp" /></view>
			<view>
				<view :class="index%3==0? 'pink' : index%2==0? 'blue' : 'green' " v-for="(item,index) in mock" :key="index">{{item}}</view>
			</view>
		</view>
		<!-- 常用分类 -->
		<view class="offset">
			<view>常用分类</view>
			<view>
				<view v-for="(item,index) in offset" :key="index">{{item}}</view>
			</view>
		</view>
		<!-- 搜索记录 -->
		<view class="select">
			<view style="width: 100%;height: 20upx;background-color: #F5F5F5;"></view>
			<view>搜索记录</view>
			<view v-for="(item,index) in allSelect" :key="index" @click="sele(index)" >{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mock:['领卷中心','Redmi K20','RedmiBook 14','智能积木 越野四驱车','手环 腕带'],
				offset:['耳机','手机','音响','手表','配件','网关/传感器','健康','酷玩'],
			}
		},
		methods:{
			sele(index){
				this.$emit("sele",index)
			}
		},
		props:{
			allSelect:Array
		}
	}
</script>

<style scoped>
	view,scroll-view,swiper,swiper-item{box-sizing: border-box;}
	#main{margin: 0upx;}
	.img{width: 100%;height: 100%;}
	
	.hot>view:first-child{font-size: 30upx;font-weight: 600;padding-left: 15upx;line-height: 80upx;}
	.hot>view:nth-child(2){width: 100%;height: 422upx;}
	.hot>view:nth-child(3){display: flex;flex-wrap: wrap;padding-top: 15upx;}
	.hot>view:nth-child(3)>view{padding: 10upx;margin: 10upx 15upx;}
	.hot>view:nth-child(3) .pink{border: 4upx solid #EFCCCE;background-color: #F8EAE9;}
	.hot>view:nth-child(3) .blue{border: 4upx solid #A9D7D9;background-color: #E8F6F6;}
	.hot>view:nth-child(3) .green{border: 4upx solid #C4D1AA;background-color: #F2F6E8;}
	
	.offset{margin-top: 15upx;}
	.offset>view:first-child{font-size: 30upx;font-weight: 600;padding-left: 15upx;line-height: 70upx;}
	.offset>view:last-child{display: flex;flex-wrap: wrap;padding-top: 15upx;}
	.offset>view:last-child>view{padding: 10upx;margin: 10upx 15upx;border: 4upx solid #F5F5F5;color: #727272;background-color: #F5F5F5;}
	
	.select>view:nth-child(2){font-weight: 600;}
	.select>view:not(:first-child){border-bottom: 2upx solid #F8F8F8;line-height: 70upx;padding-left: 20upx;font-size: 30upx;}
	
</style>
