class Compile{
	constructor(el,vm) {
	    this.$el = document.querySelector(el);
		this.$vm = vm;
		if(this.$el){
			//1.把节点解析成代码片段
			this.nodeEl = this.nodeFragement(this.$el);
			//2.把代码片段进行编译
			this.compile(this.nodeEl);
			//3.把编制后的代码片段追加进去节点el里面
			this.$el.appendChild(this.nodeEl)
		}		
	}
	//解析代码片段
	nodeFragement(el){
		//创建新的代码片段
		const frage = document.createDocumentFragment();
		let child;
		while(child = el.firstChild){
			frage.appendChild(child)
		}
		return frage;
	}
	//编译
	compile(el){
		
		//1.获取到代码片段的所有子节点
		const allNodes = el.childNodes;
		//2.遍历所有的子元素
		Array.from(allNodes).forEach(node=>{
			//判断是文本还是节点
			if(this.isNode(node)){
				console.log("节点"+node)
				//获取到所有的属性
				const nodeAttr = node.attributes;
				Array.from(nodeAttr).forEach(attr =>{
					console.log(attr);
					//获取属性name
					let attrName = attr.name;
					//获取属性值
					let attrVal = attr.value;
					console.log(attrName);
					console.log(attrVal);
					//根据属性来进行分类
					if(this.isDiractive(attrName)){
						console.log("指令")
						//以k-text来讲解
						//获取到相对应的指令，然后来进行相对应的操作
						const dir = attrName.substring(2)
						this[dir] && this[dir](node,this.$vm,attrVal)
						
					}if(this.isEvent(attrName)){
						//获取到事件类型@click
						const dir = attrName.substring(1); 
						this.eventHandler(node, this.$vm, attrVal, dir);
					}
					
				})
			}else if(this.isText(node)){
				//console.log("文本"+node.textContent)
				this.compileText(node)
			}if(node.childNodes && node.childNodes.length>0){
				this.compile(node);
			}
		})
	}
	//事件处理
	eventHandler(node, vm, exp, dir) {
		//   @click="onClick"
		//根据属性值去methods里面拿到相对相应的方法，然后添加事件监听
		let fn = vm.$option.methods && vm.$option.methods[exp];
		if(dir && fn) {
			node.addEventListener(dir, fn.bind(vm));
		}
	}
    //k-model双向绑定，除了是数据渲染之外，还需要添加事件监听
	model(node, vm, exp) {
		// 指定input的value属性
		this.update(node, vm, exp, "model");
		// 视图对模型响应--监听input输入框
		node.addEventListener("input", e => {
			vm[exp] = e.target.value;
		});
	}
    //绑定数据更新
	modelUpdate(node, value) {
		node.value = value;
	}
   //k-html指令
	html(node, vm, exp) {
		this.update(node, vm, exp, "html");
	}
   //html更新
	htmlUpdate(node, value) {
		node.innerHTML = value;
	}

	//k-text文本处理
	text(node,vm,val){
		this.update(node,vm,val,"text")
	}
	//判断是否是以k-开头的指令
	isDiractive(attr){
		return attr.indexOf("k-")==0;
	}
	//判断是否是事件
	isEvent(attr){
		return attr.indexOf("@")==0;
	}
	//文本更新到视图
	compileText(node){
		//console.log(RegExp.$1);
		//只能更新一次，所以需要改造
		//node.textContent=this.$vm.$data[RegExp.$1]
		this.update(node,this.$vm,RegExp.$1,"text")
	}
	//更新的方法
	update(node,vm,exp,dir){
		//接受指令然后拼接成方法
		const updateFn = this[dir+"Update"];//textUpdate
		updateFn && updateFn(node,vm[exp]);
		//添加依赖
		new watch(vm,exp,function(val){
			updateFn && updateFn(node,val);
		})
	}
	//文本更新
	textUpdate(node,val){
		node.textContent=val;
	}
	isNode(node){
		return node.nodeType===1;
	}
	isText(node){
		return node.nodeType===3 && /\{\{(.*)\}\}/.test(node.textContent);
	}
}