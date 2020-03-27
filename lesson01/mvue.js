//new mvue({data})
class mvue{
	//构造函数
	constructor(option) {
		//获取data数据
	   this.$data = option.data;
	   //监听数据
	   this.watcher(this.$data);
	}
	watcher(vals){
		//做的事情只有一个，就是把data里面的数据全部遍历出来
		//1.对数据进行筛选
		if(!vals || typeof vals !=="object"){
			return
		}
		//遍历数据，遍历对象,键值都需要获取
		Object.keys(vals).forEach(key=>{
			this.difineActive(vals,key,vals[key]);
		})
	}
	//数据的响应化
	difineActive(obj,key,val){
		this.watcher(val);//递归的操作判断数据是否是一个对象
		Object.defineProperty(obj,key,{
			get(){
				return val;
			},
			set(NewVal){
				if(NewVal===val){
					return;
				}
				val = NewVal;
				console.log(`${key}属性发生变化了，值是${val}`)
			}
		})
	}
}

