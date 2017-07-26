<template id="groups">
	<g :className="className"
		:transform="transforms">
		<slot></slot>
	</g>
</template>
<script>
	export default{
		props: {
			className:String,
			transform: String,
			top: Number,
			left: Number
		},
		computed:{
			transforms: function(){
			console.log(this.left);
				return "translate(" +this.left+ "," +this.top + ")";
			}
		}
	}
</script>