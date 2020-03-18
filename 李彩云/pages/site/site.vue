<template>
	<view id="site-site" class="main">
		<!-- 增加地址： -->
		<view class="topadd">
			<view class="add">
				<image src="../../static/img-percenter/add.png"></image>
			</view>
		</view>
		<!-- 地址列表： -->
		<view class="AddressList" @click="edit">
			<view class="information">
				<view class="name">huahua</view>
				<view class="hpone">135555656</view>
				<view class="address">德玛西亚</view>
			</view>
			<view class="GetInto">
				<image src="../../static/img-percenter/orders.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			
		},
		methods:{
			/**
			 * @edit：编辑页面
			 */
			edit(){
				uni.navigateTo({
					url:"../edit/edit"
				})
			}
		}
	}
	
</script>

<style>
	/* .main{background-color: #EEEEEE;} */
	image{width: 100%;height: 100%;}
	/* 增加地址: */
	.topadd{width: 100%;height: 50rpx;}
	.topadd .add{float: right;width: 50rpx;height: 50rpx;margin-right: 32rpx;}
	/* 地址列表: */
	.AddressList{width: 100%;height: 180rpx;border-bottom: 2rpx #EEEEEE solid;padding-top: 30rpx;}
	.information{float: left;width: 660rpx;height: 180rpx;font-size: 30rpx;}
	.information view{text-indent: 1em;margin-bottom: 10rpx;}
	.information view:nth-child(1){font-size: 32rpx;font-weight: 550;}
	.GetInto{float: right;width: 50rpx;height: 50rpx;margin-right: 32rpx;margin-top: 50rpx;}
</style>
