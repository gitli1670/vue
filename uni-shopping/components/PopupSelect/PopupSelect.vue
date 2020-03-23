<template>
	<view id="popup-select">
		<view class="mark" v-show="fixd" @click="handleHidMak"></view>
		<view class="popup" :class="[fixd?'.popup-options':'']">
			<!-- 收货地址 start-->
			<view class="city" v-show="popupWindow == 1">
				<view class="popup-content">
					<view class="city-font">
						收货地址
					</view>
					<view class="city-address">
						<view class="city-icon">
							<image src="../../static/img-carlist/city.png" mode=""></image>
						</view>
						<view class="">32132</view>
					</view>
				</view>
				<view class="joincar" @click="handleSure(false)">
					选择新的地址
				</view>
			</view>
			<!-- 收货地址 end-->

			<!-- 服务说明 start -->
			<view class="service" v-show="popupWindow == 2">
				<view class="popup-content">
					<view class="service-font">
						服务说明
					</view>
					<view class="service-des">
						<view class="service-des-great">
							<image src="../../static/img-carlist/select-open.png" mode=""></image>
						</view>
						<view class="service-des-font">仿米自营</view>
					</view>
					<view class="service-des">
						<view class="service-des-great">
							<image src="../../static/img-carlist/select-open.png" mode=""></image>
						</view>
						<view class="service-des-font">仿米发货</view>
					</view>
					<view class="service-des-desfont">由仿米发货</view>
					<view class="service-des">
						<view class="service-des-great">
							<image src="../../static/img-carlist/select-open.png" mode=""></image>
						</view>
						<view class="service-des-font">7天无理由就是不退货</view>
					</view>
					<view class="service-des">
						<view class="service-des-great">
							<image src="../../static/img-carlist/select-open.png" mode=""></image>
						</view>
						<view class="service-des-font">7运费说明</view>
					</view>
					<view class="service-des-desfont">不管满多少，就是不包邮;</view>
					<view class="service-des-desfont">特殊产品，也是一样;</view>
				</view>
				<view class="joincar" @click="handleSure(false)">
					确定
				</view>
			</view>
			<!-- 服务说明 end -->

			<!-- 规格  加入购物车 start-->
			<view class="popup-select" v-show="popupWindow == 3">
				<view class="popup-content">
					<view class="popup-select-pic-price">
						<!-- 图片/价钱/选项配置 -->
						<view class="popup-pic">
							<image :src="carList.cover" mode=""></image>
						</view>
						<view class="popup-price">
							<view class="popup-price-cont">
								<text class="popup-price-cont-icon">￥</text>
								<text class="popup-price-cont-pri">{{carList.pprice}}</text>
							</view>
							<view class="popup-price-des">
								<text class="popup-price-des-color">{{carList.skusText}}</text>
							</view>
						</view>
					</view><!-- 图片/价钱 -->

					<view class="popup-select-color" v-for="(item) in selectCarListConfig.goods_skus_card" :key="item.id">
						<view class="popup-select-color-text">
							{{item.name}}
						</view>
						<view class="popup-select-color-option">
							<view class="option" 
									v-for="(ite,ind) in item.goods_skus_card_value" 
									:class="{'active':ite.bool}" 
									@click="handleSelect(item,ite,ind)"
									 :key="ind">
								{{ite.value}}
							</view>
						</view>
					</view>

					<view class="quantity">
						<!--购买数量 -->
						<view class="quantity-font">购买数量</view>
						<view class="quantity-num">
							<view class="miu" @click="reduction">-</view>
							<view class="numvalue">{{carList.num}}</view>
							<view class="plus">+</view>
						</view>
					</view>
				</view>
				<view class="joincar" @click="handleSure(false,'AddCar')">
					加入购物车
				</view>
				<!--购买数量 -->
			</view>
			<!-- 规格  加入购物车end -->
		</view>
		<!--整体容器 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				optionIndex: 0, //规格下标
			}
		},
		props: {
			fixd: { //是否显示弹窗
				type: Boolean
			},
			selectCarListConfig: { //获取当前点击数据的所有规格
				type: Object
			},
			carList: { //规格选项传过来的当前点击数据
				type: Object
			},
			popupWindow: { //根据父组件传过来的数字显示弹窗
				type: Number //1收货地址 2服务说明 3购物车
			}
		},
		methods: {
			handleSelect(item, data, e) {
				/** 
				 * 点击规格选项添加样式
				 * @param {Object Array} item 点击规格类型的数据
				 * @param {ObJect} data 点击规格下面所属选项的数据
				 * @param {Number} e    点击规格下面所属选项的下标
				 */
				const _this = this
				item.goods_skus_card_value.forEach((e, i) => { //初始化为false
					e.bool = false;
				})
				data.bool = true;
				
				// let sum = 0;
				// _this.selectCarListConfig.goods_skus_card.findIndex(x => {   //pand
				// 	x.goods_skus_card_value.findIndex(item => {
				// 		if(item.bool){
				// 			sum++;
				// 			console.log(item.id)
				// 		}
				// 	})
				// })
				// if(sum==1 || sum==0){   //如果sum == 1的话代表用户只选择了一个规格所有是单规格
				// 	sum = 0;
				// }else{
				// 	sum = 1;
				// }
				
				// uni.request({
				// 	url : `http://ceshi3.dishait.cn/api/cart?id=${_this.carList.id}`,
				// 	methods : 'POST',
				// 	header : {
				// 		token : '7dadcf0161710b5256265ed25cb7873b3fd61633'
				// 	},
				// 	data :{
				// 		shop_id : data.id,
				// 		num : _this.carList.num
				// 	},
				// 	success : res => {
				// 		console.log(res)
				// 	}
				// })
				_this.$emit('ChangeActiveType', this.selectCarListConfig)
			},
			handleHidMak(){
				/**
				 * 点击蒙版隐藏弹窗 不操作
				 */
				
				this.$emit('handleCloseCar', false);
			},
			handleSure(e,des) {
				/** 
				 * 隐藏弹窗组件 修改规格 购物车：加入购物车
				 */
				const _this = this;
				// let sum = 0;
				// _this.selectCarListConfig.goods_skus_card.findIndex(x => {   //pand
				// 	x.goods_skus_card_value.findIndex(item => {
				// 		if(item.bool){
				// 			sum++
				// 		}
				// 	})
				// })
				// 	
				// if(sum==1 || sum==0){   //如果sum == 1的话代表用户只选择了一个规格所有是单规格
				// 	sum = 0
				// }else{
				// 	sum = 1 
				// }
				if(des == 'AddCar'){  //判断点击的是加入购物车 执行
				
				}
				_this.$emit('handleCloseCar', e, _this.selectCarListConfig);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'PopupSelect.scss';
</style>
