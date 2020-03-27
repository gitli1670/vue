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
			}else if(this.isText(node)){
				console.log("文本"+node)
			}if(node.childNodes && node.childNodes.length>0){
				this.compile(node);
			}
		})
	}
	isNode(node){
		return node.nodeType===1;
	}
	isText(node){
		return node.nodeType===3 && /\{\{(.*)\}\}/.test(node.textContent);
	}
}