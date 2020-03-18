<template>
	<view id="setting-setting" class="main">
		<view class="privacy">
			<view class="manage">
				账号管理
			</view>
			<view class="manage_box">
				<view class="datum_one">个人资料</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="manage_box" @click="shippingAddress">
				<view class="datum_one">收货地址</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
		</view>
		<view class="about">
			<view class="about_title">
				关于
			</view>
			<view class="about_box">
				<view class="datum_one">关于商城</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="about_box">
				<view class="datum_one">意见反馈</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="about_box">
				<view class="datum_one">协议规则</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="about_box">
				<view class="datum_one">资质证件</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="about_box">
				<view class="datum_one">用户协议</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
			<view class="about_box">
				<view class="datum_one">隐私政策</view>
				<view class="datum_two">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
		</view>
		<view class="qiut">
			<view class="qiut_text">退出登录</view>
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
			 * @shippingAddress:跳转到地址列表页面
			 */
			shippingAddress(){
				uni.navigateTo({
					url:"../site/site"
				})
			}
		}
	}
</script>

<style>
	.main{background-color:#eaeaea;height: 1110rpx;}
	image{width: 100%;height: 100%;}
	/* 账号管理: */
	.manage,.about_title{width: 100%;height: 100rpx;line-height: 100rpx;margin-left:22rpx;font-size: 30rpx;}
	.datum_one{width: 300rpx;float: left;margin-left: 32rpx;}
	.datum_two{float: right;width: 42rpx;height: 42rpx;margin-right: 32rpx;}
	.datum_img{float: right;width: 100rpx;height: 100rpx;border: 2rpx solid #EEEEEE;margin-right: 32rpx;border-radius: 50%;margin-top: 18rpx;}
	.manage_box,.about_box{background-color: white;width: 100%;height: 100rpx;line-height: 100rpx; margin-bottom: 2rpx;font-size: 30rpx;font-weight: 550;}
	.about{margin-bottom: 36rpx;}
	.qiut{width: 650rpx;margin: auto;height: 100rpx;line-height: 100rpx;text-align: center;font-size: 32rpx;font-weight: 550;background-color: white;}
</style>
