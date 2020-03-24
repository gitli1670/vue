<template>
	<view id="site-site" class="main">
		<view class="content"></view>
		<view class="return">
			<view class="return_box" @click="returnClick">
				<image src="../../static/img-percenter/return.png"></image>
			</view>
			<view class="add" @click="addClick">
				<image src="../../static/img-percenter/add.png"></image>
			</view>
		</view>
		<!-- 增加地址： -->
		<!-- <view class="topadd">
			
		</view> -->
		<view class="null"></view>
		<!-- 地址列表： -->	
		<scroll-view scroll-y="true" class="scroll">
			<view class="AddressList" v-for="(item,index) in array" :key="index" @click="edit(item,index)" >
				<view class="information">
					<view class="name">{{item.name}}</view>
					<view class="hpone">{{item.phone}}</view>
					<view class="address"> {{item.province}} {{item.city}} {{item.district}} </view>
				</view>
				<view class="GetInto">
					<image src="../../static/img-percenter/orders.png"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let app = getApp();
	export default{
		data(){
			return{
				array:'',
				name:'',
				phone:'',
				region:'',
				minute:'',
			}
		},
		onLoad() {
			let _this = this
			uni.getStorage({
				key:"name",
				success(e){
					e.data
				}
			})
			uni.request({
				url:'http://ceshi3.dishait.cn/api/useraddresses/1',
				header:{
					token:"7dadcf0161710b5256265ed25cb7873b3fd61633"	
				},
				data:{
					page:1
				},
				success: (res) => {
					this.array = res.data.data
				}
			})
			console.log(app.globalData)
		},
		methods:{
			/**
			 * @returnClick:返回至设置页面
			 */
			returnClick(){
				uni.navigateTo({
					url:'../setting/setting'
				});
			},
			/**
			 * @addClick：跳转至新增地址页面
			 */
			addClick(){
				uni.navigateTo({
					url:'../added/added'
				});
			},
			/**
			 * @edit：编辑页面
			 */
			edit(s,index){
				let name = s.name
				let phone = s.phone
				let province = s.province
				let district = s.district
				let city = s.city
				let address =s.address
				let id =s.id
				let zip =s.zip
				// console.log(s,index)
				uni.navigateTo({
					url:`../edit/edit?name=${name}&phone=${phone}&province=${province}&district=${district}&city=${city}&id=${id}&address=${address}&zip=${zip}&index=${index}`
				})
			}
		}
	}
	
</script>

<style scoped>
	.main{}
	image{width: 100%;height: 100%;}
	.content{width:100%;height:80rpx;background-color:white;}
	.return{width:100%; height:120rpx;position: fixed;z-index: 2;background-color: white;}
	.return .return_box{margin-left:32rpx;width:40upx;height: 40upx;}
	.null{width:100%;height:128rpx;}
	/* 增加地址: */
	.add{float: right;width: 50rpx;height: 50rpx;margin-right: 32rpx;}
	/* 地址列表: */
	.scroll{height: 1122rpx;}
	.AddressList{width: 100%;height: 180rpx;border-bottom: 2rpx #EEEEEE solid;padding-top: 30rpx;}
	.information{float: left;width: 660rpx;height: 180rpx;font-size: 30rpx;}
	.information view{text-indent: 1em;margin-bottom: 10rpx;}
	.information view:nth-child(1){font-size: 32rpx;font-weight: 550;}
	.GetInto{float: right;width: 50rpx;height: 50rpx;margin-right: 32rpx;margin-top: 50rpx;}
</style>
