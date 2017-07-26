import Vue from 'Vue'
import Point from './component/Point'
import Favlist from './component/Favlist'
import Line from'./component/Line'
import Axis from './component/Axis/Axis'
import Scale from'./component/utils/Scale'

var from = new Point(0,0);
var to =new Point(100,100);
var scale = Scale({
	 			rangeRound: [100, 0],
	 			domain: [0, 100]
	 		});
console.log(scale);
var vm = new Vue({
	el: '#app',
	data:{
			stroke:"black",
			width:"100px",
			height:"100px"
	},
	 render:function (h){
	 	let width = this.width;
	 	let height=this.height;
	 	let stroke = this.stroke;
	 	return h(Favlist ,{props: {width: "100px",height:height}},[
	 	h(Axis,{props:{scale: scale,
	 		hideAxisLine: false,
	 		className:'axis',
	 		top: 2,
	 		left: 3,
	 		stroke: this.stroke
		 }
		})])
	 } 
})
setTimeout(
function(){Vue.set(vm,'stroke', "red")}, 5000)
// Vue.set(vm, 'height', "500px")
