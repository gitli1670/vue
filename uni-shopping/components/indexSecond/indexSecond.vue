<template>
	<view id="main">
		<view class="lun">
			<!-- 轮播 -->
			<swiper circular autoplay interval="2000" duration="500" current=1>
				<swiper-item v-for="(item,index) in swiper" :key="index"><image class="img" :src="item.src" /></swiper-item>
			</swiper>
			<!-- 弹性布局 -->
			<view class="list">
				<view v-for="(item,index) in indexnavs" :key="index">
					<view class="list_one"><image class="img" :src="item.src" /></view>
					<view class="list_two">{{item.text}}</view>
				</view>
			</view>
			<!-- 图片展示 -->
			<view class="imglist">
				<view><image class="img" :src="threeAdv[0].src" /></view>
				<view>
					<view><image class="img" :src="threeAdv[1].src" /></view>
					<view><image class="img" :src="threeAdv[2].src" /></view>
				</view>
			</view>
			<!-- 每日精选 -->
			<view class="daily">
				<view>{{oneAdv.title}}</view>
				<view class="daily_data">
					<view><image class="img" :src="swiper[1].src" /></view>
					<view class="daily_data_one" v-for="(item,index) in list" :key="index" >
						<view><image class="img" :src="item.cover" /></view>
						<view>{{item.title}}</view>
						<view>{{item.desc}}</view>
						<view class="daily_data_one_a">
							<view>${{item.pprice}}</view>
							<view>${{item.oprice}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				swiper:[], // --------------------轮播图
				indexnavs:[], // -----------------选项
				threeAdv:[], // ------------------选项下方的三张图
				oneAdv:[], // --------------------每日精选
				list:[], // ----------------------商品
			}
		},
		created() {
			uni.request({url:"http://ceshi3.dishait.cn/api/index_category/data"}).then(res=>{
				this.swiper = res[1].data.data.data[0].data // -----------------将轮播图添加到data中
				this.indexnavs = res[1].data.data.data[1].data // --------------将选项添加到data中
				this.threeAdv = res[1].data.data.data[2].data // ---------------将选项下方的三张图片添加到data中
				this.oneAdv = res[1].data.data.data[3].data // -----------------将每日精选数据添加到data中
				this.list = res[1].data.data.data[4].data // -------------------将商品数据添加到data中
			})
		}
	}
</script>

<style scoped>
	view,scroll-view{box-sizing: border-box;}
	.img{width: 100%;height: 100%;}
	#main{width: 100%;margin: 0upx;}
	
	/* 轮播 */
	.lun swiper{width: 100%;height: 350upx;}
	.lun swiper swiper-item{width: 100%;height: 100%;}
	
	
	/* 列表 */
	.list{width: 100%;display: flex;justify-content: space-between;padding: 20upx 30upx;flex-wrap: wrap;}
	.list>view{width: 20%;height: 100upx;margin-top: 15upx;}
	.list>view .list_one{width: 40%;height: 50upx;margin: auto;}
	.list>view .list_two{text-align: center;color: #464646;font-size: 26upx;}
	
	/* 图片展示 */
	.imglist{width: 100%;height: 560upx;display: flex;justify-content: space-between;background-color: #fff;padding: 30upx 0;}
	.imglist>view:first-child{width: 55.5%;height: 100%;padding-right: 1%;background-color: white;}
	.imglist>view:last-child{width: 49.5%;height: 100%;background-color: white;}
	.imglist>view:last-child>view{width: 100%;height: 49.5%;}
	.imglist>view:last-child>view:last-child{margin-top: 2%;}
	
	/* 每日精选 */
	.daily{width: 100%;}
	.daily>view:first-child{padding-left: 15upx;font-size: 32upx;line-height: 80upx;font-weight: 500;}
	
	.daily_data{display: flex;flex-wrap: wrap;justify-content: space-between;}
	.daily_data>view:first-child{width: 100%;height:350upx;margin-bottom: 2upx;}
	.daily_data .daily_data_one{width: 49.5%;overflow: hidden;}
	.daily_data .daily_data_one>view:nth-child(1){width: 100%;height: 400upx;}
	.daily_data .daily_data_one>view:nth-child(2){font-size: 32upx;margin: 10upx 0;}
	.daily_data .daily_data_one>view:nth-child(3){overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 26upx;color: #BBBBBB;}
	.daily_data .daily_data_one .daily_data_one_a{display: flex;margin: 10upx 0;}
	.daily_data .daily_data_one .daily_data_one_a view:first-child{color: #FD6801;font-size: 32upx;}
	.daily_data .daily_data_one .daily_data_one_a view:last-child{color: #BBBBBB;font-size: 26upx;line-height: 1.8;padding-left: 10upx;}
</style>
