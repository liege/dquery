/**
 * @author Administrator
 */
dQuery.fn.extend({
	find:function(selector){
		var context = this[0];
		this.elements = context.querySelectorAll(selector);
		this.length = this.elements.length;
		return this.elements;
	},
	childer:function(){}
});
