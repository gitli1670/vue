<template>
	<view class="carlist">
		<view class="navtop" :class="[!editorColle?'.hover':'']" @click="handleEditor">
			<text>{{editorColle?"编辑":"完成"}}</text>
		</view>
		<scroll-view scroll-y style="height:930upx;">
			<view class="empty" v-if="carempty">
				<view class="emptycontent">
					<view class="caricon">
						<image src="../../static/img-carlist/shoppingcart.png"></image>
					</view>
					<view class="varicon">
						购物车还是空的
					</view>
					<view class="btn">
						去逛逛
					</view>
				</view>
			</view>
			<view class="list" v-else>
				<!-- 购物车列表 -->
				<view class="car" v-for="(item,index) in carLists" :key="item.value">
					<view class="selecradio">
						<view class="radio-select">
							<image v-if="item.checked" @click="handleSelectRadio(index)" src="../../static/img-carlist/select-open.png"></image>
								<image v-else @click="handleSelectRadio(index)" src="../../static/img-carlist/select_default.png"></image>
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
						<!-- 未点击编辑时没有样式和下拉icon 并且不可以点击-->
						<view class="format" v-if="versionSelection">
							<view class="skus">
								<!-- 选中的版本 -->
								{{item.skusText}}
							</view>
						</view>
						<!-- 点击编辑后显示样式并可以点击出现弹窗挑选格式 -->
						<view class="format" v-else :class="[!versionSelection?'.hover':'']" @click="handleSkus(index)">
							<view class="skus">
								<!-- 已选中的版本格式 -->
								{{item.skusText}}
							</view>
							<view class="skusarrow" v-show="!versionSelection">
								<view class="arrow">
									<!-- 下拉icon -->
									<image src="../../static/img-carlist/arrowdown.png"></image>
								</view>
							</view>
						</view><!-- 点击编辑添加背景样式和下拉图标 end-->
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
			<guess-like>
				<view class="guess">
					为你推荐
				</view>
				<view class="buy">
					<view class="border"></view> 
					<view class="buypeople">
						买的人还买了
					</view>
					<view class="border"></view> 
				</view>
			</guess-like>
			<!-- 为你推荐 -->
			
			<!-- 弹窗 -->
			<popup-select :fixd="fixd" :carList='carLists[ind]' :selectCarListConfig="selectCarListConfig" @handleCloseCar='handleCloseFixd'></popup-select>
			<!-- 弹窗 -->
		</scroll-view>
		<view class="all-price">
			<!-- 计算金额 收藏 删除 -->
			<view class="selectall">
				<!--全选按钮-->
				<view class="radio-select">
					<image v-if="selectAll" @click="handleSelectAll" src="../../static/img-carlist/select-open.png"></image>
						<image v-else @click="handleSelectAll" src="../../static/img-carlist/select_default.png"></image>
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
				<view class="sett" @click="handleDel">
					删除
				</view>
			</view>
		</view>
		
		<!-- ===================================== -->
		<view style="height:88upx;width: 100%;"></view>
		<view class="mark" v-show="fixd" @click="handleCloseFixd"></view>
	</view>
</template>

<script>
	import GuessLike from '../../components/GuessLike/GuessLike.vue';  //为你推荐
	import PopupSelect from '../../components/PopupSelect/PopupSelect.vue';  //弹窗
	export default { 
		data() {
			return {
				carLists: [], //商品列表数据
				editorColle: true, //编辑 完成 / 是否 合计 / 收藏、删除
				versionSelection: true, //是否显示版本选择 / 样式
				selectAll: false, //是否全选  true为否
				carempty: false, //购物车是否为空展示
				money : 0,  //总计
				fixd : false,  //点击编辑显示的选项配置按钮弹窗
				selectCarListConfig : null, //向弹窗组件发送列表数据
				ind : 0,  //点击选项后传给弹窗组件当前的数据
			}
		},
		methods: {
			carList() {
				/** 
				 * 渲染商品列表
				 */
				let that = this;
				uni.showLoading({  //渲染完成前显示
					title:'加载ing',
					mask:true
				})
				uni.request({  //请求购物车列表
					url: 'http://ceshi3.dishait.cn/api/cart',
					header: {
						token: "7dadcf0161710b5256265ed25cb7873b3fd61633"
					},
					success: (res) => {//将获取到的购物车列表存放到carLists中
							that.carLists = res.data.data;
							if(res.data.data.length == 0){
								that.carempty = true;
							}
					uni.hideLoading()  //渲染完成后隐藏
					}
				})
			},
			handleEditor() {
				/** 
				 * 点击编辑文本切换  并显示收藏和删除
				 */
				let that = this;
				this.editorColle = !this.editorColle;
				this.versionSelection = !this.versionSelection;
				if(this.carLists.length == 0){  //列表为空时全选按钮为false
					this.selectAll = false;
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
				if(this.carLists.length == 0){  //列表为空时全选按钮为false
					this.selectAll = false;
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
				for (var j = 0; j < this.carLists.length; j++) {
					if(this.carLists[j].checked){
						for (var i = 0; i < this.carLists.length; i++) {
							if(this.carLists[i].checked){
								nmb += this.carLists[i].pprice * this.carLists[i].num;
								this.money = parseFloat(nmb.toFixed(2));
							}
						}
						return
					}
				}
				this.money = 0;
			},
			handleDel(){
				/** 
				 * 点击删除选中列表
				 */
				let that = this;
				for (var i = 0; i < that.carLists.length; i++) {
					if(that.carLists[i].checked){
						uni.request({
							url:'http://ceshi3.dishait.cn/api/cart/delete',
							method:'POST',
							header:{
								token : '7dadcf0161710b5256265ed25cb7873b3fd61633'
							},
							data:{
								shop_ids : that.carLists[i].id
							},
							success: (res) => {
								this.carList();
							}
						})
					}
				}
			},
			handleSkus(e){  
				/** e 获取到当前数据下标
				 * 点击选项弹窗
				 */
				uni.showLoading({
					title:'加载ing',
					mask:true
				})
				this.ind = e;
				this.fixd = true;
				let LIstId = this.carLists[e].id;
				uni.request({  //发送点击的数据id获取库存
					url:`http://ceshi3.dishait.cn/api/cart/${LIstId}/sku`,
					header:{
						token : '7dadcf0161710b5256265ed25cb7873b3fd61633'
					},
					success:(res) => {
						this.selectCarListConfig = res.data.data;
						uni.hideLoading();
					}
				})
			},
			handleCloseFixd(){
				/** 
				 * 点击mark隐藏蒙版和弹窗
				 */
				this.fixd = false;
			}
		},
		components: {
			GuessLike,
			PopupSelect
		},
		onLoad() {
			this.carList();
			
		}
	}
</script>
<style lang="scss" scoped>
	@import 'carlist.scss';
</style>
