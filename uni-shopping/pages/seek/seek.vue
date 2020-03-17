<template>
	<view id="main">
		<!-- 顶部搜索 -->
		<seek-top @add="addSelect" />
		
		<seek-context v-if="show" :data="data" />
		
		<!-- 搜索前组件 -->
		<seek-body v-if="!show" :allSelect="select" />
		
	</view>
</template>

<script>
	import seekTop from '@/pages/seekTop/seekTop.vue' // 顶部搜索组件
	import seekBody from '@/pages/seekBody/seekBody.vue' // 搜索前组件
	import seekContext from '@/pages/seekContext/seekContext.vue' // 搜索详情
	export default{
		data(){
			return{
				select:['小米','华为'],
				data:[],
				show:false
			}
		},
		methods:{
			addSelect(e){
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
						console.log(res)
						that.data = res.data.data
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
			}
		},
		components:{
			seekTop,
			seekBody,
			seekContext
		}
	}
</script>

<style scoped>
</style>
