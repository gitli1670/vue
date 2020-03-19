<template>
	<view id="classify-shous">
		<view class="shous">
			<view class="shous-auto">
				<view class="tufl">
					<view class="tufl-pic">
						<image src="../../static/img-carlist/search.png"> </image>
					</view>
					<text class="tufl-font">{{shtext}}</text>
				</view>
				<view class="turi">
					<view class="turi-info">
						<image src="../../static/img-carlist/info.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="fenl">
			<view class="felf">	
				<view v-for="(item,index) in fentext" class="felb" :key="item.index" @click="handleSelect(index)">
					<view class="felb-font" :class="[SelectStyle == index ? 'active':'']">
						{{item.name}}
					</view>
				</view>
			</view>
			<scroll-view class="fenri" scroll-y="true" @scroll="ScrollWatch" scroll-with-animation="" :scroll-into-view="id">
				<view class="fenr" :id="'fenr'+(index+1)" v-for="(item,index) in fentext" :key="index">
					<view class="fenimgtext" v-for="(item,index) in item.app_category_items" :key="index">
						<view class="fenimgtext-pic">
							<image :src="item.cover"></image>
						</view>
						<view class="fenimgtext-font">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	export default ({
		data() {
			return {
				shtext: '智能积木  越野四驱车',
				fentext: [],  //分类
				SelectStyle : 0,  //点击分类页选中样式
				id : "fenr1",
			}
		},
		onLoad() {
			uni.request({
				url: "http://ceshi3.dishait.cn/api/category/app_category",
				success: (res) => {
					this.fentext = res.data.data
				}
			})
		},
		methods: {
			ScrollWatch(e) {
				/** 
				 * 滚动监听
				 */
				if(e.detail.scrollTop>3253){
					this.SelectStyle = 5
				}else if(e.detail.scrollTop>2663){
					this.SelectStyle = 4
				}else if(e.detail.scrollTop>2001){
					this.SelectStyle = 3
				}else if(e.detail.scrollTop>1318){
					this.SelectStyle = 2
				}else if(e.detail.scrollTop>660){
					this.SelectStyle = 1
				}else{
					this.SelectStyle = 0
				}
			},
			handleSelect(e){
				this.id = 'fenr'+parseInt(e+1);
				this.SelectStyle = e;
			}
		}

	})
</script>

<style scoped>
	image{
		width: 100%;
		height: 100%;
	}
	.shous {
		position: fixed;
		height: 68upx;
		width: 100%;
		line-height: 68upx;
		z-index: 20;
	}
	.shous-auto{
		display: flex;
		width: 97%;
		margin: auto;
	}

	.tufl {
		width:95%;
		border-radius: 10upx;
		background-color: #F7F7F7;
	}
	.tufl-pic{
		width:35upx;
		height: 35upx;
		position: absolute;
		left: 35upx;
		top:8upx;
	}
	.tufl-font{
		color: #C0C0C0;
		font-size: 24upx;
		display: inline-block;
		margin-left: 80upx;
	}

	.turi {
		width: 10%;
	}
	.turi-info{
		margin: 10upx 0 0 18upx;
		width: 45upx;
		height: 45upx;
	}

	.fenl {
		width: 100%;
		display: flex;
	}

	.felf {
		text-align: center;
		width: 20%;
		margin-top: 100upx;
	}

	.felb {
		padding: 15upx 0;
		border-bottom: 1px solid #C8C7CC;
		border-right: 1px solid #C8C7CC;
	}
	.felb .felb-font{
		height: 78upx;
		font-size: 26upx;
		line-height: 78upx;
	}
	.felb .felb-font.active{
		border-left: 3px solid #FD6801;
		color: #FD6801;
	}

	.fenri {
		height: 1000upx;
		margin-top: 100upx;
		width: 80%;
	}

	.fenr {
		height: auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.fenimgtext {
		width: 180upx;
		height: 190upx;
		text-align: center;
	}

	.fenimgtext .fenimgtext-pic {
		width: 180upx;
		height: 130upx;
	}
	.fenimgtext-font{
		font-size: 24upx;
	}
</style>
