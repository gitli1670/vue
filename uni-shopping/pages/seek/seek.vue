<template>
	<view id="main">
		<view style="width: 100%;height: 80upx;"></view>
		<!-- 顶部搜索 -->
		<seek-top @back='back' @add="addSelect" @changeValue="changeValue" :value="value" />
		
		<!-- 搜索前组件 -->
		<seek-body @sele="sele" v-if="!show" :allSelect="select" />
		
		<!-- 搜索详情 -->
		<seek-context @seleOne='seleOne' @setShop="setShop" v-if="show" :data="data" :value="value" />
		
		<!-- 筛选 -->
		<seek-sele @vanish="vanish" v-if="seekSele" />
	</view>
</template>

<script>
	import seekTop from '@/components/seekTop/seekTop.vue' // 顶部搜索组件
	import seekBody from '@/components/seekBody/seekBody.vue' // 搜索前组件
	import seekContext from '@/components/seekContext/seekContext.vue' // 搜索详情组件
	import seekSele from '@/components/seekSele/seekSele.vue' // 筛选组件
	export default{
		data(){
			return{
				select:['小米','华为'],
				data:[],
				show:false ,//搜索前与搜索后的
				seekSele:false,
				value:''
			}
		},
		methods:{
			addSelect(e){ // seekTop的自定义事件  搜索内容传值
				let that = this
				this.show = true
				if(e == "") e = '智能积木 越野四驱车'
				uni.request({
					url:"http://ceshi3.dishait.cn/api/goods/search",
					data:{
						title:e,
						page:1
					},
					method:"POST",
					success(res){
						that.data = res.data.data
						console.log(res.data.data)
					}
				})
				if(e != ""){
					for (let i in this.select) {
						if(e === this.select[i]){
							this.select.unshift(e)
							this.select.splice(this.select.indexOf(e,1),1)
							return
						}
					}
					this.select.unshift(e)
				}
			},
			setShop(e){ // seekContext的自定义事件  改变data中数据的顺序
				let all = '' 
				if(e[0].sele){
					if(e[0].top){
						all = 'desc'
					}else{
						all = 'asc'
					}
					uni.request({
						url:"http://ceshi3.dishait.cn/api/goods/search",
						data:{
							title:this.value,
							page:1,
							all:all
						},
						method:"POST",
					}).then(res=>{
						this.data = res[1].data.data
					})
				}
				if(e[1].sele){
					if(e[1].top){
						all = 'asc'
					}else{
						all = 'desc'
					}
					uni.request({
						url:"http://ceshi3.dishait.cn/api/goods/search",
						data:{
							title:this.value,
							page:1,
							sale_count:all
						},
						method:"POST",
					}).then(res=>{
						this.data = res[1].data.data
					})
				}
				if(e[2].sele){
					if(e[2].top){
						all = 'asc'
					}else{
						all = 'desc'
					}
					uni.request({
						url:"http://ceshi3.dishait.cn/api/goods/search",
						data:{
							title:this.value,
							page:1,
							min_price:all
						},
						method:"POST",
					}).then(res=>{
						this.data = res[1].data.data
					})
				}
			},
			sele(index){ // 点击历史搜索即可立即搜索
				this.show = true
				this.value = this.select[index]
				this.addSelect(this.select[index])
			},
			changeValue(e){ // 当输入内容是 改变 this.value 的值
				this.value = e
				this.addSelect(e)
			},
			back(){
				if(this.show){
					this.show = false
					this.value = ''
				}else{
					uni.navigateBack({delta:1})
				}
			},
			seleOne(){
				this.seekSele = true
				// this.show = unll
			},
			vanish(e){
				this.seekSele = false
			}
		},
		components:{
			seekTop,
			seekBody,
			seekContext,
			seekSele
		}
	}
</script>

<style scoped>
</style>
