<template>
	<view id="carlist">
		<view class="navtop" @click="handleEditor">
			<text>{{editorColle?"编辑":"完成"}}</text>
		</view>
		<view class="empty" v-if="carempty">
			<view class="emptycontent">
				<view class="caricon">
					<image src="../../static/img-carlist/shoppingcart.png" mode=""></image>
				</view>
				<view class="varicon">
					购物车还是空的
				</view>
				<button type="default" class="btn" size="mini">去逛逛</button>
			</view>
		</view>
		<view class="list" v-else>
			<!-- 购物车列表 -->
			<view class="car" v-for="(item,index) in carLists" :key="item.value">
				<view class="selecradio">
					<view class="radio-select">
						<image v-if="item.checked" @click="handleSelectRadio(index)" src="../../static/img-carlist/select-open.png">
							<image v-else @click="handleSelectRadio(index)" src="../../static/img-carlist/select_default.png">
					</view>
				</view>
				<view class="shopic">
					<!--产品图片 -->
					<view class="shopimg">
						<image :src="item.cover" mode=""></image>
					</view>
				</view>
				<view class="pro">
					<!--详情 版本 价钱 数量 -->
					<view class="intr">
						{{item.title}}
					</view>
					<!-- 点击编辑添加背景样式和下拉图标 -->
					<view class="format" :class="[versionSelection?'.hover':'']">
						<view class="skus">
							<!-- 选中的版本 -->
							{{item.skusText}}
						</view>
						<view class="skusarrow" v-show="versionSelection">
							<view class="arrow">
								<!--下拉图标 -->
								<image src="../../static/img-carlist/arrowdown.png"></image>
							</view>
						</view>
					</view>
					<view class="Product-int">
						<view class="price">
							<text class="liter">￥</text> <!-- 价钱 -->
							<text class="big">{{item.pprice}}</text>
						</view>
						<view class="price-num">
							<!-- 数量 加 减-->
							<view class="miu" @click="reduction(index)">-</view>
							<view class="numvalue">{{item.num}}</view>
							<view class="plus" @click="add(index)">+</view>
						</view>
					</view>
				</view>
			</view>
		</view> <!-- 购物车列表 -->

		<!-- 为你推荐 -->
		<guess-like></guess-like>
		<!-- 为你推荐 -->


		<view class="all-price">
			<!-- 计算金额 收藏 删除 -->
			<view class="selectall">
				<!--全选按钮-->
				<view class="radio-select">
					<image v-if="selectAll" @click="handleSelectAll" src="../../static/img-carlist/select-open.png">
						<image v-else @click="handleSelectAll" src="../../static/img-carlist/select_default.png">

				</view>
			</view>
			<view class="com" v-if="editorColle">
				<!--合计 -->
				<view class="combined" v-if="true">
					<text>合计：￥{{money}}</text>
				</view>
				<view class="settlement" v-if="true">
					结算
				</view>
			</view>
			<view class="com" v-else>
				<!--点击编辑显示移入收藏 删除 -->
				<view class="combin">
					<text>移入收藏</text>
				</view>
				<view class="sett">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import GuessLike from '../../components/GuessLike/GuessLike.vue'
	export default {
		data() {
			return {
				carLists: [], //商品列表数据
				editorColle: true, //编辑 完成 / 是否 合计 / 收藏、删除
				versionSelection: false, //是否显示版本选择 / 样式
				selectAll: false, //是否全选  true为否
				carempty: false, //购物车是否为空展示
				money : 0,  //总计
			}
		},
		methods: {
			carList() {
				/** 
				 * 渲染商品列表
				 */
				uni.request({
					url: 'http://ceshi3.dishait.cn/api/cart',
					header: {
						token: "92da5826a5d1fe9dfec355ad0093f67d2f52b502"
					},
					success: (res) => {//将获取到的购物车列表存放到carLists中
							this.carLists = res.data.data;
					}
				})
			},
			handleEditor() {
				/** 
				 * 点击编辑文本切换  并显示收藏和删除
				 */
				this.editorColle = !this.editorColle;
				this.versionSelection = !this.versionSelection;
				this.selectAll = !this.selectAll;
				//点击编辑让所有的商品为选中状态  
				for (var i = 0; i < this.carLists.length; i++) {
					this.carLists[i].checked = !this.carLists[i].checked;
				}
			},
			handleSelectRadio(e) {
				/** 
				 * 单选中  全部选中时全选选中
				 */
				let that = this;
				that.carLists[e].checked = !that.carLists[e].checked; //反选
				for (let i = 0; i < that.carLists.length; i++) {
					if (!that.carLists[i].checked) {
						that.selectAll = true;
						this.comBined();
					}
				}
				that.selectAll = !that.selectAll;
				this.comBined();
			},
			handleSelectAll(){
				/** 
				 * 全选选中时 让所有商品也选中
				 */
				let that = this;
				that.selectAll = !that.selectAll;
				for (let i in that.carLists) {
					that.carLists[i].checked = that.selectAll;
				}
				this.comBined();
			},
			reduction (e){
				/** 
				 * 减少数量 当数量等于最小值时就等于最小值
				 */
				let that = this;
				if(that.carLists[e].num > that.carLists[e].minnum){
					that.carLists[e].num = that.carLists[e].num - 1;
					this.comBined();
				}
			},
			add(e){
				/** 
				 * 点击添加数量
				 */
				let that = this;
				if(that.carLists[e].num < that.carLists[e].maxnum){
					that.carLists[e].num ++;
					this.comBined();
				}
			},
			comBined(){
				/** 
				 * 计算总计价格
				 */
				let nmb = 0;
				for (var i = 0; i < this.carLists.length; i++) {
					if(this.carLists[i].checked){
						nmb += this.carLists[i].pprice * this.carLists[i].num;
						this.money = parseFloat(nmb.toFixed(2));
					}
				}
			}
		},
		computed: {
			
		},
		components: {
			// GuessLike
		},
		onLoad() {
			this.carList();
		}
	}
</script>
<style lang="scss" scoped>
	@import 'carlist.scss';
</style>
