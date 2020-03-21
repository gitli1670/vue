<template>
	<view id="main">
		<view class="context" style="position: fixed;top: 176upx;" :style="{height: Height+'px',left:left+'%'}" > 
			<view @click="vanish"></view>
			<view class="con_fir">
				<view>
					<view>服务</view>
					<view class="con_fir_one">
						<view @click="indexSele_one(index)" v-for="(item,index) in data_one" :key="index" :class="[index===index_1?'one':'']" >{{item}}</view>
					</view>
					
					<view>分类</view>
					<view class="con_fir_one">
						<view @click="indexSele_two(index)" v-for="(item,index) in data_two" :key="index" :class="[index===index_2?'one':'']" >{{item}}</view>
					</view>
				</view>
				<view class="bottom">
					<view @click="reset">重置</view>
					<view @click="confirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				left:100,
				Height:0,
				data_one:['促销','分期','仅看有货'],
				data_two:['耳机','户外','配件'],
				
				index_1:null,
				index_2:null,
			}
		},
		created() {
			this.Height = uni.getSystemInfoSync().windowWidth*(~~(750*uni.getSystemInfoSync().windowHeight/uni.getSystemInfoSync().windowWidth)-176)/750
			
		},
		mounted() {
			this.left = 0
		},
		methods:{
			indexSele_one(index){
				this.index_1 = index
			},
			indexSele_two(index){
				this.index_2 = index
			},
			vanish(){
				this.left = 100
				setTimeout(()=>{
					this.$emit('vanish')
				},500)
			},
			confirm(){
				this.vanish()
			},
			reset(){
				this.index_1 = null
				this.index_2 = null
			}
		}
	}
</script>

<style scoped>
	view,scroll-view,swiper,swiper-item{box-sizing: border-box;}
	#main{margin: 0upx;}
	.img{width: 100%;height: 100%;}
	
	.context{width:100%;display: flex;transition: .5s;}
	.context>view:first-child{width: 20%;height: 100%;background: rgba(0,0,0,.4);}
	.context>view:last-child{width: 80%;height: 100%;background: white;position: relative;}
	
	.con_fir>view{margin-top: 40upx;padding: 0 15upx;}
	.con_fir>view>view:first-child{font-size: 32upx;}
	.con_fir_one{display: flex;justify-content: space-around;margin: 30upx 0;}
	.con_fir_one>view{width: 30%;line-height: 70upx;border: 2upx solid white;background-color: #F8F9FB;text-align: center;font-size: 32upx;font-weight: 500;}
	.con_fir_one .one{border: 2upx solid #FD6801;background-color: #FD6801;color: white;}

	.con_fir .bottom{width: 100%;line-height: 80upx;text-align: center;position: absolute;bottom: 0;font-size: 34upx;display: flex;padding: 0;}
	.con_fir .bottom>view:first-child{width: 50%;border-top: 2upx solid #F8F9FB;}
	.con_fir .bottom>view:last-child{width: 50%;color: white;background-color: #FD6801;border-top: 2upx solid #FD6801;}
</style>
