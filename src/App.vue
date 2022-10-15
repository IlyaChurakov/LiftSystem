<template>
	<LiftMine/>
</template>

<script>
import LiftMine from './components/LiftMine.vue'

export default {
	name: 'App',
	components: {
		LiftMine
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
	}
</style>
