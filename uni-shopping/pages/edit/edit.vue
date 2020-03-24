<template>
	<view id="edit-edit" class="main">
		<view class="content"></view>
		<view class="return">
			<view class="return_box" @click="returnClick">
				<image src="../../static/img-percenter/return.png"></image>
			</view>
		</view>
		<view class="delete">
			<view class="dele" @click="deleteClick">
				删除
			</view>
		</view>
		<!-- 信息： -->
		<form @submit="formSubmit">
			<view class="information">
				<view class="name">
					<text>姓名：</text>
					<input name="inputname" :value="name"/>
				</view>
				<view class="phone">
					<text>手机号码：</text>
					<input name="inputphone" :value="phone"/>
				</view>
			</view>
		
			<!-- 地址： -->
			<view class="site">
				<view class="region">
					<text>
						所在地区：
					</text>
					<view class="region_picker">
						 <picker mode = region @change="bindPickerChange">
							<view class="uni-input" style="float: left;":custom-item="province">
								{{region}}
							</view>
						</picker> 
					</view>
				</view>
				<view class="minute">
					<text>详细地址：</text><input name="inputdistrict" :value="district"/>
				</view>
			</view>
			<!-- 设为默认地址： -->
			<view class="default">
				<view class="default_text">设为默认地址</view>
				<view class="default_switch">
					<switch @change="switch1Change" />
				</view>
			</view>
			<view class="Preservation">
				<button form-type="submit">保存</button>
			</view>
		</form>
	</view> 
</template>

<script>
	export default{
		data(){
			return{
				/**
				 * array：地址数据
				 * index：列表下标
				 * name：收货地址列表传参姓名
				 * phone：收货地址列表传参电话
				 * province：收货地址列表传参地址省份
				 * district：收货地址列表传参详细地址
				 * city：收货地址列表传参地址市
				 * address：收货地址列表传参address
				 * checked:是否选中为默认
				 */
				region: '',
				index: -1,
				name:'',
				phone:'',
				province:'',
				district:'',
				city:'',
				address:'',
				checked:0,
				zip:'',
				id:''
			}
		},
		onLoad(e) {
			let _this = this
			_this.name = e.name
			_this.phone = parseInt(e.phone)
			_this.province = e.province
			_this.district = e.district
			_this.city = e.city
			_this.address = e.address
			_this.zip = e.zip
			_this.region = _this.province.concat(' ' + _this.city)
			_this.index = e.index
			_this.id = e.id
		},
		methods:{
			returnClick(){
				uni.navigateTo({
					url:'../site/site'
				});
			},
			/**
			 * @switch1Change :设置为默认地址
			 */
			switch1Change: function (e) {
				this.checked = e.target.value
				if(_this.checked==false){
					_this.checked=0
				}else{
					_this.checked=1
				}
			    console.log(this.checked)
			},
			/**
			 * @bindPickerChange :所在地区
			 */
			bindPickerChange: function(e) {
			    this.region = e.target.value
				this.region = this.region[0].concat(' ' + this.region[1].concat(' ' + this.region[2]))
			},
			/**
			 * @deleteClick :删除信息
			 */
			deleteClick(){
				let _this = this
				uni.showModal({
				    title: '提示',
				    content: '确定删除吗',
				    success: function (res) {
				        if (res.confirm) {
							uni.request({
								url:'http://ceshi3.dishait.cn/api/useraddresses/'+_this.id+'',
								header:{
									token:'7dadcf0161710b5256265ed25cb7873b3fd61633'
								},
								method:"DELETE",
								success: (res) => {
									uni.navigateTo({
										url:'../site/site'
									});
								}
							})
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				})
			},
			/**
			 * @formSubmit :提交信息
			 */
			formSubmit: function(e){
				let _this = this
				let region = _this.region.split(' ')
				let region_one = region[0]
				let region_two = region[1].concat(region[2])
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
				if(e.detail.value.inputname==""||e.detail.value.inputphone==""||e.detail.value.inputdistrict==''){
					uni.showModal({
						content: '输入不能为空',
						showCancel: false
					});
				}else if(!myreg.test(e.detail.value.inputphone)){
					uni.showModal({
						content: '输入正确的手机号码格式',
						showCancel: false
					});
				}else{
					console.log(_this.id)
					console.log(this.id)
					uni.request({
						url:'http://ceshi3.dishait.cn/api/useraddresses?id='+_this.id+'',
						header:{
							token:'7dadcf0161710b5256265ed25cb7873b3fd61633'
						},
						data:{
							province:region_one,
							city:region_two,
							district:e.detail.value.inputdistrict,
							address:_this.address,
							zip:_this.zip,
							name:e.detail.value.inputname,
							phone:e.detail.value.inputphone,
							default: _this.checked
						},
						method:'POST',
						success: (res) => {
							uni.navigateTo({
								url:'../site/site'
							});
						}
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	image{height:100%;width:100%;}
	.main{background-color: #EEEEEE;height: 1334rpx;}
	.content{width:100%;height:80rpx;background-color: #EEEEEE;}
	.return{margin-left:32rpx;height:50rpx;}
	.return .return_box{width:40upx;height: 40upx;}
	/* 删除: */
	.delete{color: #808080; width: 100%;height: 60rpx;line-height: 60rpx;background-color: white;}
	.dele{float: right;margin-right: 30rpx;}
	/* 信息; */
	.information,.site{font-size: 30rpx;margin-bottom: 20rpx;}
	.name,.phone,.region,.minute{width: 100%;height: 90rpx;line-height: 90rpx;font-size: 30rpx;color: #555555;margin-bottom: 2rpx;background-color: white;}
	input{border: 0;color: #555555;padding-top: 24rpx;padding-bottom: 10rpx;}
	.information text{float: left;margin-left:22rpx;}
	.site text{float: left;margin-left:22rpx;}
	.region_picker{float: left;width: 576rpx;height: 90rpx;}
	/* 默认地址: */
	.default{font-size: 30rpx;width: 100%;height: 90rpx;line-height: 90rpx;background-color: white;color: #555555;}
	.default_text{float: left;margin-left:22rpx;}
	.default_switch{float: right;margin-right: 32rpx;}
	/* 保存: */
	.Preservation button{width:626rpx;height: 90rpx;background-color: #ff6c22; margin-top:34rpx; color: white;font-size: 32rpx;margin-bottom: 42rpx;}
</style>
