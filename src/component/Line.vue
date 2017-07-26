<template >
	<line :x1="from.x"
		:y1="from.y"
		:x2="to.x"
		:y2="to.y"
		:stroke="stroke"
		/>
</template>
<script>
	export default{
		props:{
			from: Object,
			to: Object,
			stroke:String
		}

	}
</script>