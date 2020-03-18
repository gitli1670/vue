<template>
	<view id="main">
		<view class="seek">
			<view @click="back"><image class="img" src="../../static/img-seek/back.png"/></view>
			<view class="seek_con">
				<view><image class="img" src="../../static/img-index/seek.png" /></view>
				<!-- <view>智能积木 越野四驱车</view> -->
				<input focus :value="value" @input="change" placeholder="智能积木 越野四驱车" />
			</view>
			<view @click="seek">搜索</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// value:''
			}
		},
		props:{
			value:String
		},
		methods:{
			back(){ // 返回
				this.$emit("back")
			},
			change(e){ // input框发生改变时
				this.$emit('changeValue',e.detail.value)
				// this.value = e.detail.value
				
			},
			seek(){
				this.$emit("add",this.value)
			}
		}
	}
</script>

<style scoped>
	view,scroll-view,swiper,swiper-item{box-sizing: border-box;}
	#main{margin: 0upx;}
	.img{width: 100%;height: 100%;}
	
	.seek{width:100%;height: 80upx;display: flex;justify-content: space-between;background-color: white;padding-top: 10upx;}
	.seek>view:first-child{width: 50upx;height: 50upx;margin: auto 10upx;font-weight: 500;}
	.seek>view:last-child{width: 80upx;line-height: 60upx;margin: auto 10upx;font-size: 36upx;}
	.seek .seek_con{width:560upx;height:100%;background-color: #F7F7F7;border-radius: 10upx;display: flex;}
	.seek .seek_con>view:first-child{width:40upx;height: 40upx;margin-top: 15upx;margin-left: 15upx;}
	.seek .seek_con>input{margin: auto;margin-left: 10upx;}
</style>