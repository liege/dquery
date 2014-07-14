dQuery javascript库 `beta`
===
基本结构搭好，实用方法有待慢慢扩展
---
###说明
> * 推荐使用环境: ES5+ 浏览器  
> * UI可单独使用，兼容当前常用浏览器

###设计结构(参照jquery)
> * 1.顶级对象 dquery,构造函数dquery.portotype.init
> * 3.通过dQuery.fn.extend()可扩展对象方法 ，通过dQuery.fn扩展工具函数 

###DOM 选择器
> * 基于ES5 querySelectorAll()  
> * 暂不考虑进行低版本浏览器兼容  

###DOM 事件
> * 鼠标事件  click、dblclick……    
> * 键盘事件  keydown、keyup……  
> * 事件绑定 on(type,handler)  
> * 移除事件 off(type,handler)  //handler不能为匿名函数  
> * 复合事件 toggle……

###DOM 属性
> * attr()

###DOM STYLE
> * css() css3属性自动添加浏览器前缀
> * h() 获取或设置元素高度
> * innerH() 获取元素高度+padding
> * outerH() 获取元素高度+padding+[border+margin || border]
> * w() innerW() outerW()同上
> * bg() get set背景
> * color() get set颜色

###DOM EFFECTS
> *  move() 运动到指定位置

###DOM 树遍历
> * find()

###BOM 客户端检测
> * client.engine 浏览器呈现引擎及版本
> * client.browser 浏览器厂家及版本

###工具函数
> * each([],fn(i,v))遍历数组 each({},fn(k,v))遍历对象 
> * isFunction
> * isArray
> * ……

###UI 组件(css样式基于bootstrap ui)
> * 轮播图
> * 拖拽 $("要操作的dquery对象").drag(boomerang[boolean]释放后是否返回初始位置，destination[object]释放后到指定坐标)
> * 可拖拽交换位置列表 $("父元素").draglist();
		javascript:
		$("#wraplist").draglist();	
		html:
		<ul id="wraplist" class="ui-draglist">
			<li></li>
			……
		</ul>	
> * 垂直水平居中
		center
> * 模拟滚动条
> * 下拉
> * 选项卡  $("父元素").tabs(事件类型[string]，默认选中[number]，自动切换[boolean)
		$("#tabs").tabs();	默认点击切换、选中第一项
		$("#tabs").tabs(events,number);	设置触发事件及初始选中项
> * 无限级联导航（水平，垂直）
> * 弹出层（遮罩||不遮罩,自动关闭）



