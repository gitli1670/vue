<template>
	<view class="ztbox">
		<view class="fh">
			<image src="../../static/img-commoditydetails/next.png"></image>
		</view>
		
		<view class="tatle">
			<image :src="carlist.cover"></image>
			<view class="minti">{{carlist.title}}</view>
			<view class="mide">{{carlist.desc}}</view>
			<view class="minjia">$3299</view>
		</view>
		<scroll-view scroll-x="true" class="mincpu">
			<view class="mituwen">
				<view class="mitu" v-for="item in carlist.goodsAttrs" :key="item.id">
					<view class="miimg">
						<image src="../../static/img-commoditydetails/CPU.png"></image>
					</view>
					<view class="cpuname">{{item.name}}</view>
					<view class="vaname">{{item.value}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="shansb">
			<view class="shanone" @click="SelectSkus(3)" >
				<view class="shanyx">已选</view>
				<view class="shanpez">{{}}</view>
				<view class="shanimg">
					<image src="../../static/img-commoditydetails/next.png"></image>
				</view>
			</view>
			<view class="shanone" @click="SelectSkus(1)">
				<view class="shanyx">配送</view>
				<view class="shanpez">北京 东城区 <text>有现货</text></view>
				<view class="shanimg">
					<image src="../../static/img-commoditydetails/next.png"></image>
				</view>
			</view>
			<view class="shanone" @click="SelectSkus(2)">
				<view class="shanjw">
					<image src="../../static/img-commoditydetails/true.png"></image>
					<text>小米主营</text>
					<image src="../../static/img-commoditydetails/true.png"></image>
					<text>小米发货</text>
					<image src="../../static/img-commoditydetails/true.png"></image>
					<text>七天无理由退货</text>
					<view class="shanjwim">
						<image src="../../static/img-commoditydetails/next.png"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="tjtu" v-html="img.content"></view> -->

		<scroll-view scroll-x="true" class="plqu">
			<view class="plds">
				<view class="plks" v-for="item in pltextimg" :key="item.id">
					<view class="pltoux">
						<view style="float: left;">
							<image :src="item.user.avatar"></image>
						</view>
						<view style="float: left;">
							<view>{{item.user.nickname}}</view>
							<view>{{item.review_time}}</view>
						</view>
						<view style="float: right;line-height: 80upx;">
							<image src="../../static/img-commoditydetails/点赞.png" style="width: 40upx;height: 40upx;"></image>
							<text>{{item.id}}</text>
						</view>
					</view>
					<view style="line-height: 80upx;height: 80upx;">{{item.review.data}}</view>
					<view class="plimg">
						<image :src="item.review.image"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<guess-like>
			<view style="font-size: 19px;font-weight:500;line-height: 100upx;">为你推荐</view>
		</guess-like>

		<view class="bootom">
			<view class="bootsc">
				<image src="../../static/img-commoditydetails/like.png"></image>
				<view>收藏</view>
			</view>
			<view class="bootgwc">
				<image src="../../static/img-commoditydetails/shop.png"></image>
				<view>购物车</view>
			</view>
			<view class="bootjr" @click="SelectSkus(3)">
				<view>加入购物车</view>
			</view>
		</view>

		<popup-select :fixd="fixd" 
					:popupWindow='popupWindow' 
					:carList='carList' 
					:selectCarListConfig="selectCarListConfig"
					@ChangeActiveType='ChangeActiveType' 
					@handleCloseCar='handleCloseFixd'>
		</popup-select>
	</view>
</template>

<script>
	import GuessLike from '../../components/GuessLike/GuessLike.vue'
	import PopupSelect from '../../components/PopupSelect/PopupSelect.vue'
	export default {
		data() {
			return {
				carlist: {},
				pltextimg: [],
				img: {},
				fixd: false,
				popupWindow: null,
				tccolor:{},
				tcpz:{}
			}
		},
		onLoad() {
			uni.request({  //商品详情
					url: "http://ceshi3.dishait.cn/api/goods/25",
					success: (res) => {
						console.log(res)
						this.carlist = res.data.data;
						this.tccolor = res.data.data.goodsSkusCard[0].goodsSkusCardValue[0];//颜色
						this.tcpz = res.data.data.goodsSkusCard[0].goodsSkusCardValue[0];//套餐
					}
				})
			uni.request({  
				url: "http://ceshi3.dishait.cn/api/goods/25/comments/good?page=1",
				success: (res) => {
					this.pltextimg = res.data.data.list;
				}
			})
		},
		methods: {
			SelectSkus(e) {
				/** 
				 * 点击已选规格/加入购物车 弹窗 //1收货地址 2服务说明 3购物车
				 */
				this.fixd = true;
				this.popupWindow = e;
			},
			handleCloseFixd(e){
				/**
				 * 子组件传false 隐藏弹窗
				 */
				this.fixd = e;
			}
		},
		components: {
			GuessLike,
			PopupSelect
		}
	}
</script>

<style>
	.ztbox {
		width: 100%;
		font-size: 28upx;
		overflow: hidden;
	}
	
.fh{
	position: fixed;
	left: 0upx;
	top: 50upx;
	width: 100upx;
	height: 100upx;
	background-color: #808080;
	text-align: center;
	border-radius: 50%;
}
.fh image{
	position: relative;
	top: 30upx;
	width: 43upx;
	height: 43upx;
}
	.tatle image {
		width: 100%;
	}

	,
	.minti {
		font-weight: 500;
		font-size: 19px;
		margin-left: 10rpx;
	}

	.mide {
		font-size: 14px;
		color: #C8C7CC;
		margin-left: 10rpx;
	}

	.minjia {
		margin-left: 20upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 20px;
		color: #FA6B07;
	}

	.mincpu {
		width: 747rpx;
		height: 200rpx;
		text-align: center;
		line-height: 150upx;
	}

	.mituwen {
		display: flex;
		flex-wrap: nowrap;
	}

	.mitu {
		width: 200upx;
		height: 200upx;
	}

	.mitu image {
		width: 40upx;
		height: 40upx;
	}

	.miimg {
		width: 200upx;
		height: 40upx;
	}

	.cpuname {
		text-align: center;
		font-size: 17px;
		height: 40upx;
	}

	.vaname {
		font-size: 14px;
		text-align: center;
		height: 50upx;
	}

	.shansb {
		width: 700upx;
		height: 240upx;
		margin-left: 20upx;
		border: 1px #F2F2F0 solid;
		background-color: #F5F5F3;
	}

	.shanone {
		height: 80upx;
		border-bottom: 1px #F2F2F0 solid;
		width: 700upx;
		padding-left: 50upx;
		padding-right: 50upx;
	}

	.shanyx {
		line-height: 80upx;
		color: #808080;
		float: left;
	}

	.shanpez {
		color: #555555;
		float: left;
		margin-left: 20upx;
		line-height: 60upx;
	}

	.shanpez text {
		margin-left: 10upx;
		color: #E98943;
	}

	.shanimg {
		float: right;
		margin-right: 50upx;
		text-align: center;
	}

	.shanimg image {
		width: 40upx;
		height: 40upx;
		padding-top: 20upx;
	}

	.shanjw {
		color: #808080;
		font-size: 15px;
	}

	.shanjw text {
		margin-left: 10upx;
	}

	.shanjw image {
		width: 30upx;
		height: 30upx;
		margin-left: 10upx;
	}

	.shanjwim {
		display: inline-block;
	}

	.shanjwim image {
		padding-top: 20upx;
		width: 40upx;
		height: 40upx;
	}

	.plqu {
		width: 747rpx;
		height: 540upx;
		/* border: 1px #C0C0C0 solid; */

	}

	.plks {
		width: 600upx;
		height: 540upx;
		border: 1px #F1F1F1 solid;
		padding: 20upx;
	}

	.pltoux {
		height: 120upx;
		font-size: 15px;

	}

	.pltoux image {
		width: 100upx;
		height: 100upx;
		margin-right: 20upx;
	}

	.plimg image {
		width: 600upx;
		height: 300upx;
	}

	.plds {
		display: flex;
		flex-wrap: nowrap;
		width: 747rpx;
		height: 400upx;
	}

	.bootom {
		background-color: #FFFFFF;
		display: block;
		position: fixed;
		z-index: 10;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 130upx;
	}

	.bootsc {
		padding-top: 15upx;
		float: left;
		width: 200upx;
		height: 115upx;
		text-align: center;
	}

	.bootom image {
		text-align: center;
		width: 50upx;
		height: 50upx;

	}

	.bootgwc {
		text-align: center;
		float: left;
		width: 200upx;
		height: 115upx;
		padding-top: 15upx;
	}

	.bootjr {
		text-align: center;
		float: left;
		width: 350upx;
		height: 130upx;
		line-height: 130upx;
		background-color: #FD6801;
		color: #FFFFFF;
	}

	.tjtu {
		width: 100%;
	}
</style>
