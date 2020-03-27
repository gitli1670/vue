//new mvue({data})
class mvue{
	//构造函数
	constructor(option) {
		//获取data数据
	   this.$data = option.data;
	   //监听数据
	   this.watcher(this.$data);
	   //模拟手动添加依赖
	   new watch();
	   this.$data.name;
	   new watch();
	   this.$data.bar.age;
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
		const dep = new Dep();
		this.watcher(val);//递归的操作判断数据是否是一个对象
		Object.defineProperty(obj,key,{
			get(){
				//初始化过程中添加依赖，每一个依赖都有属于自己的观察者，所以要把Dep.target指向依赖自己的观察者
				dep.addDep(Dep.target)
				return val;
			},
			set(NewVal){
				if(NewVal===val){
					return;
				}
				val = NewVal;
				//console.log(`${key}属性发生变化了，值是${val}`)
				dep.notify();
			}
		})
	}
}

//依赖
class Dep{
	constructor() {
	   //存放所有的依赖
		this.deps =[]
	}
	//添加依赖的方法
	addDep(dep){
		this.deps.push(dep);
	}
	//监听依赖通知更新视图
	notify(){
		//当数据发生变化时通知视图更新
		this.deps.forEach(dep=>{
			dep.update()
		})
	}
}

//观察者---监听依赖的变化
class watch{
	constructor() {
		//把观察者的this指向依赖的目标中
	    Dep.target = this;
	}
	update(){
		//更新视图的操作
		console.log("数据更新了")
	}
}
