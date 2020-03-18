<template>
	<view id="edit-edit" class="main">
		<view class="delete">
			<view class="dele">
				删除
			</view>
		</view>
		<!-- 信息： -->
		<view class="information">
			<view class="name">
				<text>姓名：</text>
				<input name="inputname"/>
			</view>
			<view class="phone">
				<text>手机号码：</text>
				<input name="inputphone"/>
			</view>
		</view>
		<!-- 地址： -->
		<view class="site">
			<view class="region">
				<text>所在地区：</text>
			</view>
			<view class="minute">
				<text>详细地址：</text>
			</view>
		</view>
		<!-- 设为默认地址： -->
		<view class="default">
			<view class="default_text">设为默认地址</view>
			<view class="default_switch">
				<switch checked @change="switch1Change" />
			</view>
		</view>
		<view class="Preservation">
			<button form-type="submit">保存</button>
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
			 * @switch1Change :设置为默认地址
			 */
			switch1Change: function (e) {
			    console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style>
	.main{background-color: #EEEEEE;height: 1110rpx;}
	/* 删除: */
	.delete{color: #808080; width: 100%;height: 60rpx;line-height: 60rpx;background-color: white;}
	.dele{float: right;margin-right: 30rpx;}
	/* 信息; */
	.information,.site{font-size: 30rpx;margin-bottom: 20rpx;}
	.name,.phone,.region,.minute{width: 100%;height: 90rpx;line-height: 90rpx;padding-left:22rpx;font-size: 30rpx;color: #555555;margin-bottom: 2rpx;background-color: white;}
	input{border: 0;color: #555555;padding-top: 28rpx;padding-bottom: 10rpx;}
	.information text{float: left;}
	/* 默认地址: */
	.default{font-size: 30rpx;width: 100%;height: 90rpx;line-height: 90rpx;padding-left:22rpx;background-color: white;color: #555555;}
	.default_text{float: left;}
	.default_switch{float: right;margin-right: 32rpx;}
	/* 保存: */
	.Preservation button{width:626rpx;height: 90rpx;background-color: #ff6c22; margin-top:34rpx; color: white;font-size: 32rpx;margin-bottom: 42rpx;}
</style>
