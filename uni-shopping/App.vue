<script>
	export default {
		onLaunch: function(e) {
			console.log('onLaunch',e)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(e){
			console.log("报错提示信息",e)
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uni.scss';
</style>
