<template>
	<view id="popup-select">
		<view class="mark" v-show="fixd">
			</view>
		<view class="popup" :class="[fixd?'.popup-options':'']">  <!--整体容器  :style="'bottom:'+fixd+'upx;'"-->
			<view class="popup-select"> <!-- 选项内容 -->
				<view class="popup-select-pic-price">  <!-- 图片/价钱/选项配置 -->
					<view class="popup-pic">
						<image :src="selectCarListConfig.cover" mode=""></image>
					</view>
					<view class="popup-price">
						<view class="popup-price-cont">
							<text class="popup-price-cont-icon">￥</text>
							<text class="popup-price-cont-pri">3369</text>
						</view>
						<view class="popup-price-des">
							<text class="popup-price-des-color">123</text>
							<text class="popup-price-des-capa">456</text>
							<text class="popup-price-des-meal">789</text>
						</view>
					</view>
				</view><!-- 图片/价钱 -->
				
				<view class="popup-select-color" v-for="(item) in selectCarListConfig.goods_skus_card" :key="item.id">  <!-- 颜色选项 -->
					<view class="popup-select-color-text">{{item.name}}</view>
					<view class="popup-select-color-option">
						<view class="option" v-for="(ite) in item.goods_skus_card_value" :key="ite.value">{{ite.value}}</view>
					</view>
				</view>  <!-- 颜色选项 -->
				
				
				<view class="quantity">  <!--购买数量 -->
					<view class="quantity-font">购买数量</view>
					<view class="quantity-num">
						<view class="miu">-</view>
						<view class="numvalue">12</view>
						<view class="plus">+</view>
					</view>
				</view>  <!--购买数量 -->
			</view><!-- 选项内容 -->
			
			<view class="joincar" @click="handleJoinCar">
				加入购物车
				<!-- {{selectCarListConfig}} -->
			</view>
		</view>  <!--整体容器 -->
	</view>		
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:{
			fixd : {
				type : Boolean
			},
			selectCarListConfig : {
				type : Object
			}
		},
		methods:{
			handleJoinCar(){
				console.log(this.$props.selectCarListConfig)
			}
		},
		created() {
			
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import 'PopupSelect.scss';
</style>
