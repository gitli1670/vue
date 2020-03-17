<template>
	<view id="main">
		<!-- 顶部搜索 -->
		<seek-top @add="addSelect" @changeValue="changeValue" :value="value" />
		
		<!-- 搜索前组件 -->
		<seek-body @sele="sele" v-if="!show" :allSelect="select" />
		
		<!-- 搜索详情 -->
		<seek-context @setShop="setShop" v-if="show" :data="data" />
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
				show:false ,//搜索前与搜索后的
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
			},
			setShop(e){ // seekContext的自定义事件  改变data中数据的顺序
				if(e[0].sele){
					let arr = JSON.parse(JSON.stringify(this.data))
					for (let i in this.data) {
						let itemI = this.data[i]
						for (let j = i; j < this.data.length; j++) {
							let itemJ = this.data[j]
							if(~~((itemI.comments_good_count/itemI.comments_count)*100)<~~((itemJ.comments_good_count/itemJ.comments_count)*100)){
								let item1 = itemI.comments_good_count
								itemI.comments_good_count = itemJ.comments_good_count
								itemJ.comments_good_count = item1
								let item2 = itemI.comments_count
								itemI.comments_count = itemJ.comments_count
								itemJ.comments_count = item2
								let itemArr = arr[i]
								arr[i] = arr[j]
								arr[j] = itemArr
							}
						}
					}
					if(e[0].top){
						this.data = arr.reverse()
					}else{
						this.data = arr
					}
				}
				if(e[1].sele){
					let arr = JSON.parse(JSON.stringify(this.data))
					for (let i in this.data) {
						let itemI = this.data[i]
						for (let j = i; j < this.data.length; j++) {
							let itemJ = this.data[j]
							if(itemI.comments_count<itemJ.comments_count){
								let item = itemI.comments_count
								itemI.comments_count = itemJ.comments_count
								itemJ.comments_count = item
								let itemArr = arr[i]
								arr[i] = arr[j]
								arr[j] = itemArr
							}
						}
					}
					if(e[1].top){
						this.data = arr.reverse()
					}else{
						this.data = arr
					}
				}
				if(e[2].sele){
					let arr = JSON.parse(JSON.stringify(this.data))
					for (let i in this.data) {
						let itemI = this.data[i]
						for (let j = i; j < this.data.length; j++) {
							let itemJ = this.data[j]
							if(itemI.min_price<itemJ.min_price){
								let item = itemI.min_price
								itemI.min_price = itemJ.min_price
								itemJ.min_price = item
								let itemArr = arr[i]
								arr[i] = arr[j]
								arr[j] = itemArr
							}
						}
					}
					if(e[2].top){
						this.data = arr.reverse()
					}else{
						this.data = arr
					}
				}
			},
			sele(index){ // 点击历史搜索即可立即搜索
				this.show = true
				this.value = this.select[index]
				this.addSelect(this.select[index])
			},
			changeValue(e){ // 当输入内容是 改变 this.value 的值
				this.value = e
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
