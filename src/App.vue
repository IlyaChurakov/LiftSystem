<template>
	<LiftMine 
		:floorCount="floorCount" 
		:heightAboveGround="heightAboveGround[0]" 
		:up="up[0]" 
		:down="down[0]" 
		:blink="blink[0]"/>
	<LiftMine 
		:floorCount="floorCount" 
		:heightAboveGround="heightAboveGround[1]" 
		:up="up[1]" 
		:down="down[1]" 
		:blink="blink[1]"/>
	<LiftButtons 
		:changeFloor="changeFloor" 
		:inputValue="inputValue" 
		:floorCount="floorCount"
		:heightAboveGround="heightAboveGround"
		:activeBtn="activeBtn"
		:changeColor="changeColor"
		:up="up"
		:down="down"
		:changeFloorWithoutQueue="changeFloorWithoutQueue"/>
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
			heightAboveGround: [100, 0],
			up: [false, false],
			down: [false, false],
			blink: [false, false],
			activeBtn: false
		}
	},
	components: {
		LiftMine,
		LiftButtons
	},
	methods: {
		inputValue(item) {
			console.log(item)
		},
		changeColor() {
			this.activeBtn = true
			// event.target.style.background = this.activeBtn == true ? '#ff1111' : '#ffadad'
		},
		changeFloorWithoutQueue(id, liftIndex) {

			let upFree = [...this.up]
			let downFree = [...this.down]

			console.log('a', upFree)

			upFree.reduce((a, e, i) => {
				if (e === true)
					a.push(i);
				return a;
			}, [])

			let _freeLiftsUp = [...upFree.reduce((a, e, i) => {
				if (e === false)
					a.push(i);
				return a;
			}, [])]// Индексы свободных лифтов

			let _freeLiftsDown = [...downFree.reduce((a, e, i) => {
				if (e === false)
					a.push(i);
				return a;
			}, [])]

			let freeLifts = _freeLiftsUp.filter((obj) => {
				return _freeLiftsDown.indexOf(obj) >= 0;
			}); // Массив с индексами свободных лифтов

			console.log('free 1', freeLifts)

			if(this.up[liftIndex] == true || this.down[liftIndex] == true) {

				let arr = []

				console.log('free 2', freeLifts)

				freeLifts.forEach((item) => {
					arr.push(this.heightAboveGround[item]) // высоты свободных лифтов
				})

				let btnHeightAboveGround = (id - 1) * 100
                
				let closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[0]
                let idx = this.heightAboveGround.indexOf(closest)

				console.log(idx)

				liftIndex = idx
			}

			let DestinationFloor = (id - 1) * 100
			let floor = this.heightAboveGround[liftIndex]

			if (this.heightAboveGround[liftIndex] < DestinationFloor) {

				let timerUp = setInterval(() => {
					this.up[liftIndex] = true

					if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
						floor += 2
					} else {
						this.up[liftIndex] = false
						this.blink[liftIndex] = true
						// localStorage.setItem(`heightAboveGround`, JSON.stringify(this.heightAboveGround));
						// console.log(typeof localStorage.getItem('heightAboveGround'))
						setTimeout(() => {
							this.blink[liftIndex] = false
							this.activeBtn = false
						}, 1000)
						
						clearInterval(timerUp)
					}
					
					this.heightAboveGround[liftIndex] = floor
					// localStorage.setItem(`heightAboveGround[${liftIndex}]`, this.heightAboveGround[liftIndex]);
				}, 20);
				
			} else if (this.heightAboveGround[liftIndex] > DestinationFloor) {

				let timerDown = setInterval(() => {

					this.down[liftIndex] = true

					if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
						floor -= 2
					} else {
						this.down[liftIndex] = false
						this.blink[liftIndex] = true
						localStorage.setItem(`heightAboveGround`, [...this.heightAboveGround]);
						console.log(localStorage.getItem('heightAboveGround'))
						setTimeout(() => {
							this.blink[liftIndex] = false
							this.activeBtn = false
						}, 1000);

						clearInterval(timerDown)
					}
					
					this.heightAboveGround[liftIndex] = floor
					// localStorage.setItem(`heightAboveGround[${liftIndex}]`, this.heightAboveGround[liftIndex]);
				}, 20);
			}
		}
	},
	computed: {
		changeFloor() {

			// let upBusy = [...this.up]
			// let downBusy = [...this.down]

			// upBusy.reduce((a, e, i) => {
			// 	if (e === true)
			// 		a.push(i);
			// 	return a;
			// }, [])

			// let _freeLifts = [...upBusy.reduce((a, e, i) => {
			// 	if (e === false)
			// 		a.push(i);
			// 	return a;
			// }, []), ...downBusy.reduce((a, e, i) => {
			// 	if (e === false)
			// 		a.push(i);
			// 	return a;
			// }, [])]// Индексы занятых лифтов

			// let freeLifts = [...new Set(_freeLifts)]

			// console.log(freeLifts)

			return createQueue((id, liftIndex) => {
				console.log("start", id);
				console.log(id)
				return new Promise((resolve) => {
				// actions...
					let DestinationFloor = (id - 1) * 100
					let floor = this.heightAboveGround[liftIndex]

					if (this.heightAboveGround[liftIndex] < DestinationFloor) {

						let timerUp = setInterval(() => {
							this.up[liftIndex] = true

							if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
								floor += 2
							} else {
								this.up[liftIndex] = false
								this.blink[liftIndex] = true
								localStorage.setItem(`heightAboveGround`, JSON.stringify(this.heightAboveGround));
								console.log(typeof localStorage.getItem('heightAboveGround'))
								setTimeout(() => {
									this.blink[liftIndex] = false
									this.activeBtn = false
									console.log('end', id)
									resolve()
								}, 1000)
								
								clearInterval(timerUp)
							}
							
							this.heightAboveGround[liftIndex] = floor
							// localStorage.setItem(`heightAboveGround[${liftIndex}]`, this.heightAboveGround[liftIndex]);
						}, 20);
						
					} else if (this.heightAboveGround[liftIndex] > DestinationFloor) {

						let timerDown = setInterval(() => {

							this.down[liftIndex] = true

							if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
								floor -= 2
							} else {
								this.down[liftIndex] = false
								this.blink[liftIndex] = true
								localStorage.setItem(`heightAboveGround`, [...this.heightAboveGround]);
								console.log(localStorage.getItem('heightAboveGround'))
								setTimeout(() => {
									this.blink[liftIndex] = false
									this.activeBtn = false
									console.log('end', id)
									resolve();
								}, 1000);

								clearInterval(timerDown)
							}
							
							this.heightAboveGround[liftIndex] = floor
							// localStorage.setItem(`heightAboveGround[${liftIndex}]`, this.heightAboveGround[liftIndex]);
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
