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
		:floorCount="floorCount"
		:heightAboveGround="heightAboveGround"
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
			floorCount: 6, // Количество этажей
			heightAboveGround: [0, 0], // Указывается значение в пикселях кратное 100
			up: [false, false], // Нахождение лифта в движении вверх
			down: [false, false], // Нахождение лифта в движении вниз
			blink: [false, false], // Мигание лифта
			// Для увеличения количества шахт нужно добавлять еще по одному элементу в массивы
			// А также добавить новый компонент LiftMine в template у которого, где нужно, будет стоять индекс согласно его номеру (счет с нуля)
		}
	},
	components: {
		LiftMine,
		LiftButtons
	},
	methods: {
		changeFloorWithoutQueue(id, liftIndex) { // работает одновременное движение, но не работает очередь

			let upFree = [...this.up],
				downFree = [...this.down]

			let _freeLiftsUp = [...upFree.reduce((a, e, i) => {
				if (e === false)
					a.push(i);
				return a;
			}, [])]
			let _freeLiftsDown = [...downFree.reduce((a, e, i) => {
				if (e === false)
					a.push(i);
				return a;
			}, [])] // Индексы свободных лифтов

			let freeLifts = _freeLiftsUp.filter((obj) => {
				return _freeLiftsDown.indexOf(obj) >= 0;
			}); // Массив с индексами свободных лифтов

			if(this.up[liftIndex] == true || this.down[liftIndex] == true || this.blink[liftIndex] == true) {

				let arr = []

				freeLifts.forEach((item) => {
					arr.push(this.heightAboveGround[item]) // высоты свободных лифтов
				})

				let btnHeightAboveGround = (id - 1) * 100,
					closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[0],
					idx = this.heightAboveGround.indexOf(closest)

				liftIndex = idx
			}

			let DestinationFloor = (id - 1) * 100
			let floor = this.heightAboveGround[liftIndex]

			if (this.heightAboveGround[liftIndex] < DestinationFloor) {

				let timerUp = setInterval(() => {
					this.up[liftIndex] = true

					if (this.heightAboveGround[liftIndex] !== DestinationFloor) {
						floor += 2
					} else {
						this.up[liftIndex] = false
						this.blink[liftIndex] = true

						localStorage.setItem(`heightAboveGround`, JSON.stringify(this.heightAboveGround))

						setTimeout(() => {
							this.blink[liftIndex] = false
							this.activeBtn = false
						}, 3000)
						
						clearInterval(timerUp)
					}
					
					this.heightAboveGround[liftIndex] = floor
				}, 20);
				
			} else if (this.heightAboveGround[liftIndex] > DestinationFloor) {

				let timerDown = setInterval(() => {

					this.down[liftIndex] = true

					if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
						floor -= 2
					} else {
						this.down[liftIndex] = false
						this.blink[liftIndex] = true
						
						localStorage.setItem(`heightAboveGround`, JSON.stringify(this.heightAboveGround))

						setTimeout(() => {
							this.blink[liftIndex] = false
							this.activeBtn = false
						}, 3000);

						clearInterval(timerDown)
					}
					
					this.heightAboveGround[liftIndex] = floor
				}, 20);
			}
		}
	},
	computed: {
		changeFloor() { // Работает очередь, но не работает одновременное движение с несколькими лифтами, если лифт один, то все работает отлично, вызов происходит в LiftButtons в методе CompareLifts
			return createQueue((id, liftIndex) => {
				console.log("start", id);
				console.log(id)
				return new Promise((resolve) => {
				
					let upFree = [...this.up]
					let downFree = [...this.down]

					let _freeLiftsUp = [...upFree.reduce((a, e, i) => {
						if (e === false)
							a.push(i);
						return a;
					}, [])]
					let _freeLiftsDown = [...downFree.reduce((a, e, i) => {
						if (e === false)
							a.push(i);
						return a;
					}, [])] // Индексы свободных лифтов

					let freeLifts = _freeLiftsUp.filter((obj) => {
						return _freeLiftsDown.indexOf(obj) >= 0;
					}); // Массив с индексами свободных лифтов

					if(this.up[liftIndex] == true || this.down[liftIndex] == true || this.blink[liftIndex] == true) {

						let arr = []

						freeLifts.forEach((item) => {
							arr.push(this.heightAboveGround[item]) // высоты свободных лифтов
						})

						let btnHeightAboveGround = (id - 1) * 100
						let closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[0]
						let idx = this.heightAboveGround.indexOf(closest)

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
								// localStorage.setItem(`heightAboveGround`, JSON.stringify(this.heightAboveGround))
								setTimeout(() => {
									this.blink[liftIndex] = false
									this.activeBtn = false
									console.log('end', id)
									resolve()
								}, 1000)
								
								clearInterval(timerUp)
							}
							
							this.heightAboveGround[liftIndex] = floor
						}, 20);
						
					} else if (this.heightAboveGround[liftIndex] > DestinationFloor) {

						let timerDown = setInterval(() => {

							this.down[liftIndex] = true

							if(this.heightAboveGround[liftIndex] !== DestinationFloor) {
								floor -= 2
							} else {
								this.down[liftIndex] = false
								this.blink[liftIndex] = true
								// localStorage.setItem(`heightAboveGround`, [...this.heightAboveGround])
								setTimeout(() => {
									this.blink[liftIndex] = false
									this.activeBtn = false
									console.log('end', id)
									resolve();
								}, 1000);

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
