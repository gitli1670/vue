<template>
	<view id="guess-like">
		<view class="guesslike">
			<slot></slot>
			<view class="guess-like-list">
				<view class="list-left" v-for="(item) in guessLike" :key="item.id">
					<view class="guess-like-pic">
						<image :src="item.cover" mode=""></image>
					</view>
					<view class="describe">{{item.title}}</view>
					<view class="modles"><text>{{item.desc}}</text></view>
					<view class="price">
						<text class="symbol">￥</text>
						<text class="original">{{item.min_price}}</text>
						<text class="discount">￥{{item.min_oprice}}</text> 
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				guessLike : [],
			}
		},
		created() {
			let that = this;
			uni.request({  //请求推荐商品列表
				url:'http://ceshi3.dishait.cn/api/goods/hotlist',
				success: (res) => {
					that.guessLike = res.data.data;
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	 @import 'GuessLike.scss';
</style>
