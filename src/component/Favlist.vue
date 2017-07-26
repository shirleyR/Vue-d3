<template id="template-home">
	<div>
		<svg :width="width"
			 :height="height">
			 <slot></slot>
			 </svg>
	</div>	
</template>

<script>
	export default{
		props:['width','height'],
		computed:{

		}	
	}
</script>

