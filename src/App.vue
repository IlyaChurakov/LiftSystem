<template>
	<LiftMine 
		:floorCount="floorCount" 
		:heightAboveGround="heightAboveGround[0]" 
		:up="up" 
		:down="down" 
		:blink="blink"/>
	<LiftMine 
		:floorCount="floorCount" 
		:heightAboveGround="heightAboveGround[1]" 
		:up="up" 
		:down="down" 
		:blink="blink"/>
	<LiftButtons 
		:changeFloor="changeFloor" 
		:inputValue="inputValue" 
		:floorCount="floorCount"
		:heightAboveGround="heightAboveGround"/>
</template>

<script>

import LiftMine from './components/LiftMine.vue'
import LiftButtons from './components/LiftButtons.vue'
import createQueue from '@/createQueue'

export default {
	name: 'App',
	data() {
		return {
			floorCount: 6,
			liftCount: 2,
			heightAboveGround: [0, 0],
			up: false,
			down: false,
			blink: false
		}
	},
	components: {
		LiftMine,
		LiftButtons
	},
	methods: {
		inputValue(item) {
			console.log(item)
		}
	},
	computed: {
		changeFloor() {

			return createQueue((id, liftIndex) => {
				console.log("start", id);
				return new Promise((resolve) => {
				// actions...
					let DestinationFloor = (id - 1) * 100
					let floor = this.heightAboveGround[liftIndex]

					if (this.heightAboveGround[liftIndex] < DestinationFloor) {

						let timerUp = setInterval(() => {
							this.up = true

							if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
								floor += 2
							} else {
								this.up = false
								this.blink = true

								setTimeout(() => {
									this.blink = false
									console.log('end', id)
									resolve()
								}, 3000)
								
								clearInterval(timerUp)
							}
							
							this.heightAboveGround[liftIndex] = floor
						}, 20);
						
					} else if (this.heightAboveGround[liftIndex] > DestinationFloor) {

						let timerDown = setInterval(() => {

							this.down = true

							if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
								floor -= 2
							} else {
								this.down = false
								this.blink = true

								setTimeout(() => {
									this.blink = false
									console.log('end', id)
									resolve();
								}, 3000);

								clearInterval(timerDown)
							}
							
							this.heightAboveGround[liftIndex] = floor
						}, 20);
					}
				});
			});
		}
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
