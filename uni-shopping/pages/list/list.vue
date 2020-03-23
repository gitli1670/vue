<template>
	<view id="main">
		<!-- 头部选择 -->
		<view class="top" v-if="!noData">
			<!-- <view class="top_one" v-for="(item,index) in topData" :key="index" @click="topSele(index)" >
				<view :style="{color:topIndex===index?'#FD6801':''}">{{item.name}}</view>
				<view>
					<view><image class="img" :src="item.sele? item.top?'../../static/img-seek/top1.png':'../../static/img-seek/top.png' : '../../static/img-seek/top.png'" /></view>
					<view><image class="img" :src="item.sele? item.top?'../../static/img-seek/bottom.png':'../../static/img-seek/bottom1.png' : '../../static/img-seek/bottom.png'" /></view>
				</view>
			</view>
			<view class="top_two">筛选</view> -->
		</view>
		<!-- 商品内容 -->
		<view class="shop">
			<!-- <view v-if="noData" >
				<view class="shop_noData">
					当前没有搜索到“<view>{{value}}</view>”或类似的商品
				</view>
				<guess-like>
					<view style="text-align: center;color:#FD6801;font-size: 36upx;font-weight: 600;line-height: 100upx;">为你推荐</view>
				</guess-like>
			</view> -->
				
			<scroll-view v-if="!noData" scroll-y :style="{height:scrollHeight+'px'}">
				<view class="shop_data" @click="look(index)" v-for="(item,index) in data" :key="index">
					<view><image class="img" :src="item.cover" /></view>
					<view class="shop_data_one">
						<view>{{item.title}}</view>
						<view>{{item.desc}}</view>
						<view>￥{{item.min_price}}</view>
						<view>
							<view>{{item.comments_count}}条评论</view>
							<view>{{~~((item.comments_good_count/item.comments_count)*100)}}% 满意</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import GuessLike from '../GuessLike/GuessLike.vue'
	export default{
		data(){
			return{
				data:[],
				topData:[
					{name:'综合',sele:true,top:true},
					{name:'销量',sele:false,top:true},
					{name:'价格',sele:false,top:true}
				],
				topIndex:0, // 字体颜色
				scrollHeight:0, // 滚动条高度
				noData:false
			}
		},
		created() {
			// 计算scrollHeight的高度
			this.scrollHeight = uni.getSystemInfoSync().windowWidth*(~~(750*uni.getSystemInfoSync().windowHeight/uni.getSystemInfoSync().windowWidth)-300)/750
			// 列表数据
			uni.request({
				url:"http://ceshi3.dishait.cn/api/goods/search",
				data:{
					title:'小米',
					page:1
				},
				method:"POST"
			}).then(res=>{
				this.data = res.data.data
			})
		},
		watch:{
			data:{
				handler(newVal, oldVal) {
					console.log(this.data)
					this.data.length ? this.noData = false : this.noData = true
				},
				// 深度监听 属性的变化
				deep: true
			}
		},
		methods:{
			topSele(index){
				if(this.topIndex === index){ // 是否点击已选中的    如是，则返回
					this.topData[index].top = !this.topData[index].top // 改变三角形方向
					return
				}
				this.topIndex = index // 改变选中的下标
				this.topData.forEach((data)=>{ //将原来数据初始化
					data.sele = false
					data.top = true
				})
				this.topData[index].sele = true // 改变三角形颜色
			},
			seleOne(){
				this.$emit('seleOne')
			},
			look(index){
				
			}
		},
		components:{
			GuessLike
		}
	}
</script>

<style scoped>
	view,scroll-view,swiper,swiper-item{box-sizing: border-box;}
	#main{margin: 0upx;}
	.img{width: 100%;height: 100%;}
	
	.top{width: 100%;height: 120upx;border-top: 2upx solid #F3F3F3;border-bottom: 2upx solid #F3F3F3;padding: 30upx 0;display: flex;justify-content: space-between;margin-top: 20upx;}
	.top>view{text-align: center;line-height: 60upx;font-size: 30upx;margin: auto;justify-content: center;}
	.top .top_one{display:flex;}
	.top .top_one>view:last-child{margin-top: -10upx;margin-left: 10upx;}
	.top .top_one>view:last-child view{width: 30upx;height: 20upx;margin: 0 auto;}
	.top .top_two{color: #FD6801;}
	.shop{width: 100%;}
	
	.shop_noData{width: 100%;line-height: 200upx;text-align: center;font-size: 32upx;}
	.shop_noData>view{display: inline-block;color: #FD6801;}
	
	.shop_data{width: 100%;height: 280upx;display: flex;padding: 10upx;justify-content: space-between;}
	.shop_data>view:first-child{width: 35%;height: 240upx;}
	.shop_data_one{width: 64%;}
	.shop_data_one>view:nth-child(1){font-size: 32upx;font-weight: 600;}
	.shop_data_one>view:nth-child(2){font-size: 24upx;color: #767E84;margin: 15upx 0;height: 66upx;overflow: hidden;text-overflow:ellipsis;}
	.shop_data_one>view:nth-child(3){font-size: 30upx;color: #FD6801;margin-bottom: 15upx;}
	.shop_data_one>view:nth-child(4){display: flex;font-size: 24upx;color: #767E84;}
	.shop_data_one>view:nth-child(4)>view:first-child{margin-right: 10upx;}
</style>