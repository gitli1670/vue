<template>
	<view id="login">
		<view class="passTop">
			<view></view>
			<view>忘记密码</view>
		</view>
		<view class="password">
			<view class="passText">
				密码登录
			</view>
			<view class="input">
				<form @submit="formSubmit">
					<view class="input_box">
						<input class="uni-input" name="input" placeholder="请输入手机号/邮箱/小米账号" />
						<input class="uni-input" password name="pas" type="text" placeholder="请输入密码" />
					</view>
					<view class="input_text"> 用手机短信登录> </view>
					<view class="input_but">
						<button form-type="submit">登录</button>
					</view>
					<checkbox-group class="uni-list" @click="disClick" :checked="checked">
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="agreement ">
								<checkbox>我已阅读并同意小米<text>账号协议、隐私政策</text>和<text>小米商城用户协议</text></checkbox>
							</view>
						</label>
					</checkbox-group>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/**
				* checked:是否选中
				* inputname:input账号名称value值
				* name:接口调用账号名称
				* inputpas：input密码value值
				* pass:密码数据
				*/
				checked:false,
				inputname:'',
				name:'',
				inputpas:'' ,
				pass:'zcmcss'
			}
		},
		onLoad() {
			
		},
		methods: {
			/**
			* @disClick:是否选中
			*/
			disClick(){
				this.checked=!this.checked
			},
			/**
			* formSubmit:登录提交信息
			*/
			formSubmit: function(e) {
				let _this = this
				_this.inputname = e.detail.value.input
				_this.inputpas = e.detail.value.pas
				uni.request({
					url:'http://ceshi3.dishait.cn/api/login',
					data:{
						username : 'user2',
						password : 'zcmcss'
					},
					method:'POST',
					success:(res) =>{
						this.name = res.data.data.username
						if(_this.inputname==""||_this.inputpas==""){
							uni.showModal({
									content: '输入不能为空',
									showCancel: false
							    });
						}else if(_this.inputname===_this.name){
							if(_this.inputpas===_this.pass){
								if(_this.checked==true){
									uni.showModal({
										content: '登录成功',
										showCancel: false
									}).then(()=>{
										uni.setStorage({
											key:"token",
											data:res.data.data.token
										})
										uni.setStorage({
											key:"name",
											data:_this.name
										})
										uni.switchTab({
											url:"../index/index"
										})
									})
								}else{
									uni.showModal({
										content: '您未同意协议',
										showCancel: false
									});
								}
							}else{
								uni.showModal({
								    content: '密码错误',
								    showCancel: false
								});
							}
						}else{
							uni.showModal({
							    content: '不存在此用户',
							    showCancel: false
							});
						}
					}
				})
				
            },
		}
	}
</script>

<style>
	.passTop{color: #555555;width: 750rpx;height: 80rpx;}
	.passTop view:nth-child(1){float: left;display: inline-block;}
	.passTop view:nth-child(2){float: right;display: inline-block;margin-right: 60rpx;margin-top: 30rpx;;}
	.password{width: 626rpx;padding: 64rpx;}
	.password .passText{font-size: 60rpx;font-weight: 900;width: 626rpx;height: 210rpx;line-height: 150rpx;}
	.password .input{font-size: 32rpx;color: #999999;}
	.input input{width:626rpx;height: 40rpx; border: 0px; border-bottom: 3rpx solid #808080;padding-left: 6rpx;padding-bottom: 12rpx; margin-bottom: 66rpx;}
	.input_text{height: 138rpx;}
	.input_but button{width:626rpx;height: 90rpx;background-color: #F0AD4E;color: white;font-size: 32rpx;margin-bottom: 42rpx;}
	.agreement {font-size: 30rpx;margin-top: 16rpx;}
	.agreement text{font-size: 32rpx;font-weight: 650;text-decoration: underline;}
</style>
