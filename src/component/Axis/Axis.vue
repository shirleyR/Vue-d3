<script>

	import Line from '../Line';
	import Point from '../Point';
	import Group from '../Group';
	import center from '../utils/center';
	import identity from '../utils/identity';
	import getLabelTransform from '../utils/labelTransform';
	import ORIENT from '../constants/orientation';

	export default{
		props:{
			scale:Function,
			orientation:String,
			top:{
				type:Number,
				default: 0
			},
			left:{
				type: Number,
				default: 0
			},
			rangePadding:{
				type:Number,
				default: 0
			},
			stroke:{
				type:String,
				default:"black"
			},
			strokeWidth:{
				type:Number,
				default:1
			},
			// strokeDasharray:
			numTicks:{
				type:Number,
				default: 10
			},
			tickFormat:String,
			tickStroke:'black',
			tickLength:{
				type:Number,
				default: 8
			},
			tickTransform:String,
			hideAxisLine :{
				type: Boolean,
				default: false
			},
			hideTicks:{
				type: Boolean,
				default: false
			},
			hideZero: {
				type: Boolean,
				default: false
			},
			labelOffset:{
				type: Number,
				default: 14
			},
			className: String
		},
		render:function(h){
			const  values = this.scale.ticks? this.scale.ticks(this.numTicks) :this.scale.domain();
			let format = this.scale.tickFormat ? this.scale.tickFormat() : identity;
			if(this.tickFormat) format = this.tickFormat;

			const range = this.scale.range();
			const range0 = range[0] + 0.5 - this.rangePadding;
			const range1 = range[range.length - 1] + 0.5 + this.rangePadding;

			const horizontal = this.orientation !== ORIENT.left && this.orientation !== ORIENT.righgt;
			const isLeft = this.orientation === ORIENT.left;
			const isTop = this.orientation === ORIENT.top;
			const tickSign = isLeft || isTop ? -1: 1;

			const position = (this.scale.bandwidth ? center : identity)(this.scale.copy())

			const axisFromPoint = new Point(
				horizontal ? range0 : 0,
				horizontal ? 0 : range0
			);

			const axisToPoint = new Point(
				horizontal ? range1 :0,
				 horizontal ? 0 : range1
			)
			console.log(axisToPoint);

			// const tickLabelFontSize = thistickLabelComponent.props.fontSize || 10;

			const labelTransform = getLabelTransform({
				tickLength: this.tickLength,
				labelOffset: this.labelOffset,
				// tickLabelFontSize,
				orientation: this.orientation,
				range: this.range
			});

			var children = values.map((val, i) =>{
				if(this.hideZero && val === 0) return null;
				const tickFromPoint = new Point(
					horizontal ? position(val): 0,
					horizontal?  0: position(val)
				);
				const tickToPoint = new Point(
					horizontal ? position(val) : (tickSign * this.tickLength),
				 horizontal ? (this.tickLength * tickSign) : position(val)
				);
				const tickLabelProps = {
					x: tickToPoint.x,
					y: tickToPoint.y + (horizontal && !isTop ? tickLabelFontSize :0)
				}
				if(!this.hideTicks){
					return h(Group, {
						props: {
							key: 'vx-tick-'+val+'-'+i,
		    	top: this.top,
		    	left: this.left,      
							className: 'vx-axis-ticks',
							transform: this.tickTransform
						}
					},[
					h(Line, {
						props:{
							from: tickFromPoint,
							to: tickToPoint,
							stroke: this.tickStroke|| this.stroke
						}
					})])
				}
				return h(Group, {props:{
						key: 'vx-tick-'+val+'-'+i,
						className: 'vx-axis-ticks',
		    	top: this.top,
		    	left: this.left,
						transform: this.tickTransform
					}
				})
			});
			console.log(this.tickTransform);
			if(this.hideAxisLine)
			return h(Group ,{props:{
		    	className: this.className,
		    	top: this.top,
		    	left: this.left,
		    	transform:this.tickTransform
		    }});
		    return h(Group, {props:{
		    	className: this.className,
		    	top: this.top,
		    	left: this.left,
		    	transform:this.tickTransform
		    }}, [children, h(Line, {props: {
		    	from: axisFromPoint,
							to: axisToPoint,
							stroke: this.stroke,
							strokeWidth: this.strokeWidth
		    }})])
		}

	}
</script>