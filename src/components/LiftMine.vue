<template>
    <div 
        class="mine" 
        :style="{
            height: `${setHeightOfMine}`
        }"
    >
        <div class="floor-lines">
            <div 
                class="floor-line" 
                v-for="line in (floorCount + 1)"
                v-bind:key="line"
                :style="{
                    bottom: `${setPlaceFloorLine[line - 1]}px`
                }"
            ></div>
        </div>

        <div class="lift-buttons">
            <button 
                class="lift-button"
                v-for="btn in floorCount"
                v-bind:key="btn"
                :style="{
                    bottom: `${setPlaceFloorBtn[btn - 1]}px`
                }"
                @click="changeFloor(btn)"
            ></button>
        </div>

        <LiftBox :heightAboveGround="heightAboveGround" :up="up" :down="down"/>
    </div>
</template>

<script>

    import LiftBox from './LiftBox.vue'
    import createQueue from '@/createQueue'

    export default {
        data() {
            return {
                floorCount: 10,
                heightAboveGround: 0,
                up: false,
                down: false,
                list: []
            }
        },
        methods: {
            input(item) {
                console.log(item)
            }
        },
        computed: {
            setHeightOfMine() {
                return this.floorCount * 100 + 'px'
            },
            setPlaceFloorLine() {
                let start = -5
                let arr = [start]

                for(let i = 0; i < this.floorCount; i++) {
                    start += 100
                    arr.push(start)
                }
                return arr
            },
            setPlaceFloorBtn() {
                let start = 40
                let arr = [start]

                for(let i = 0; i < this.floorCount; i++) {
                    start += 100
                    arr.push(start)
                }
                return arr
            },
            changeFloor() {
                return createQueue((id) => {
                    console.log("start", id);
                    return new Promise((resolve) => {
                    // actions...

                        let DestinationFloor = (id - 1) * 100

                        let floor = this.heightAboveGround

                        if (this.heightAboveGround < DestinationFloor) {

                            let timerUp = setInterval(() => {

                                this.up = true

                                if(this.heightAboveGround !== DestinationFloor) {
                                    floor += 2
                                } else {
                                    this.up = false
                                    console.log('end', id)
                                    resolve()
                                    clearInterval(timerUp)
                                }
                                
                                this.heightAboveGround = floor
                            }, 20);
                            
                        } else if (this.heightAboveGround > DestinationFloor) {

                            let timerDown = setInterval(() => {

                                this.down = true

                                if(this.heightAboveGround !== DestinationFloor) {
                                    floor -= 2
                                } else {
                                    this.down = false
                                    
                                    console.log('end', id)
                                    resolve()
                                    clearInterval(timerDown)
                                }
                                
                                this.heightAboveGround = floor
                            }, 20);
                        }
                    });
                });
            },
        },
        components: {
            LiftBox
        }
    }
</script>

<style scoped>
    .mine {
        margin: 0px 50px;
        width: 96px;
        border: 2px solid black;
        border-bottom: none;
        border-top: none;
        display: flex;
        align-items: center;
        position: relative;
    }
    .floor-lines {
        height: 100%;
        width: 100px;
    }
    .floor-line {
        position: absolute;
        width: 98px;
        height: 10px;
        background: rgba(0, 0, 0, 0.352);
        z-index: 10;
        transform: translateX(-1px);
    }
    .lift-buttons {
        height: 100%;
        width: 100px;
        transform: translateX(40px);
    }
    .lift-button {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #ffcead;
        border-radius: 50%;
        border: 2px solid #c25205;
    }
    .lift-button:hover {
        transform: scale(120%);
        background: #ffad77;
        cursor: pointer;
    }
</style>