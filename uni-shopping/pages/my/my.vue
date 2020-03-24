<template>
	<view class="main" id="my">
		<view class="content"></view>
		<!-- 个人头像背景部分： -->
		<view class="top">
			<view class="top_right">
				<view class="top_i"><image src="../../static/img-percenter/i.png"></image> </view>
			</view>
			<view class="top_bottom">
				<view class="top_head">
					<view class="top_headimg" @click="modifiedData">
						<!-- <image src=""></image> -->
					</view>
					<view class="top_headtext">昵称</view>
				</view>
				<view class="member">
					<view class="member_box">
						<text>会员积分</text>
					</view>
					<view class="member_empty">
						<view class="member_img"><image src="../../static/img-percenter/king1.png"></image> </view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单新信息： -->
		<view class="orders">
			<view class="orders_top">
				<text>我的订单</text>
				<text>全部订单> </text>
			</view>
			<view class="orders_bottom">
				<view class="order_information"> 
					<view><image src="../../static/img-percenter/orders1.png"></image> </view>
					<view>代付款</view>
				</view>
				<view class="order_information">
					<view><image src="../../static/img-percenter/orders2.png"></image> </view>
					<view>代收货</view>
				</view>
				<view class="order_information">
					<view><image src="../../static/img-percenter/orders3.png"></image> </view>
					<view>代评价</view>
				</view>
				<view class="order_information">
					<view><image src="../../static/img-percenter/orders4.png"></image> </view>
					<view>退换修</view>
				</view>
			</view>
		</view>
		<!-- 手机图片： -->
		<view class="phoneImg"></view>
		<!-- 功能部分： -->
		<view class="MainFunction">
			<view class="function_box">
				<view class="function_img"><image src="../../static/img-percenter/function1.png"></image> </view>
				<view class="function_text">小米会员</view>
				<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
			</view>
			<view class="function_box">
				<view class="function_img"><image src="../../static/img-percenter/function2.png"></image> </view>
				<view class="function_text">会员中心</view>
				<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
			</view>
			<view class="function_box">
				<view class="function_img"><image src="../../static/img-percenter/function3.png"></image> </view>
				<view class="function_text">服务中心</view>
				<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
			</view>
			<view class="function_box">
				<view class="function_img"><image src="../../static/img-percenter/function4.png"></image> </view>
				<view class="function_text">小米之家</view>
				<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
			</view>
			<view class="function_box">
				<view class="function_img"><image src="../../static/img-percenter/function5.png"></image> </view>
				<view class="function_text">更多功能</view>
				<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
			</view>
		</view>
		<!-- 更多设置： -->
		<view class="set" @click="setClick">
			<view class="function_img"><image src="../../static/img-percenter/set.png"></image> </view>
			<view class="function_text">更多设置</view>
			<view class="function_more"> <image src="../../static/img-percenter/orders.png"></image> </view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				
			}
		},
		onLoad(){
			
		},
		methods:{
			/**
			 * @modifiedData:跳转到修改资料页面
			 */
			modifiedData(){
				uni.navigateTo({
					url:"../modified-data/modified-data"
				})
			},
			/**
			* @modifiedData:跳转到更多设置页面
			*/
			setClick(){
				uni.navigateTo({
					url:"../setting/setting"
				})
			}
		}
	}
</script>

<style scoped>
	.main{background-color: #F5F5F5;padding-bottom: 10rpx;}
	image{width: 100%;height: 100%;}
	.content{width:100%;height:80rpx;background-color: #F5F5F5;}
	/* 顶端背景部分: */
	.top{height: 314rpx;}
	.top_right{height: 96rpx;width: 750rpx;}
	.top_right .top_i{width: 60rpx;height: 60rpx;margin-right: 22rpx;margin-top: 36rpx; float: right;}
	.top_bottom{width: 750rpx;height: 232rpx;}
	.top_head{width: 400rpx;height: 232rpx;float: left;}
	.top_headimg{width:160rpx;height: 160rpx;float: left;margin-top: 20rpx;margin-left: 62rpx;border-radius: 50%;background-color: #4CD964;}
	.top_headtext{float: left; height: 80rpx;color: white;margin-left: 10rpx;margin-top: 80rpx;}
	.member{float: right;width: 350rpx; height:232rpx;}
	.member_empty{width: 82rpx;height: 82rpx;float: right;border-top-left-radius:50%;border-bottom-left-radius: 50%;background-color: #FFCC00;margin-top:100rpx ;}
	.member .member_box{background-color: #FFCC00;width: 190rpx;height: 82rpx;line-height: 82rpx; float: right;margin-top: 100rpx;color: #CC6600 ;font-size: 32rpx;}
	.member .member_img{width:40rpx;height: 40rpx;margin-top: 18rpx;margin-left: 28rpx;}
	/* 订单部分: */
	.orders{width: 100%;height: 254rpx;}
	.orders .orders_top{width: 100%;height: 100rpx;line-height: 100rpx; background-color: white;margin-bottom: 4rpx;}
	.orders .orders_top text:nth-child(1){font-weight: 800;font-size: 34rpx;color: black;float: left;margin-left: 20rpx;}
	.orders .orders_top text:nth-child(2){font-size: 30rpx;color: #555555;float: right;margin-right: 8rpx;}
	.orders_bottom{width: 100%;height: 126rpx; display: flex;justify-content: space-around;background-color: white;padding-top: 24rpx;}
	.order_information{width: 100rpx;height:100rpx;font-size: 30rpx;text-align: center;}
	.order_information view:nth-child(1){width: 52rpx;height: 52rpx;margin-left: 22rpx;}
	/* 手机图片: */
	.phoneImg{width: 100%;height: 300rpx;background: #4CD964;margin-top: 20rpx;}
	/* 功能部分: */
	.MainFunction{width: 100%;}
	.function_box{width: 100%;height: 92rpx;line-height: 92rpx; background-color: white;margin-bottom: 2rpx;}
	.function_img{float: left;width: 38rpx;height: 38rpx;margin-left: 40rpx;margin-top: 8rpx;}
	.function_text{float: left;width: 578rpx; margin-left: 14rpx;}
	.function_more{float: left;width: 40rpx;height: 40rpx;margin-top: 8rpx;}
	/* 更多设置: */
	.set{margin-top: 22rpx;background-color: white;width: 100%;height: 92rpx;line-height: 92rpx;}
</style>
