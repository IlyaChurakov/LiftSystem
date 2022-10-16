<template>
    <ul class="lift-buttons">
        <li 
            class="lift-button"
            v-for="btn in floorCount"
            v-bind:key="btn"
            :style="{
                bottom: `${setPlaceFloorBtn[btn - 1]}px`
            }"
            @click="compareLifts(btn), this.changeColor()"
        ></li>
    </ul>
</template>

<script>
    export default {
        name: 'LiftButtons',
        data() {
            return {
                liftIndex: [...this.heightAboveGround],
                indexOfClosestLift: undefined
            }
        },
        props: {
            floorCount: Number,
            changeFloor: Function,
            inputValue: Function,
            heightAboveGround: Array,
            activeBtn: Boolean,
            changeColor: Function,
            up: Array,
            down: Array,
            changeFloorWithoutQueue: Function
        },
        methods: {
            compareLifts(btn) {
                let btnHeightAboveGround = (btn - 1) * 100
                let arr = [...this.heightAboveGround]

                let closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[0]
                let idx = this.heightAboveGround.indexOf(closest)

                console.log(btn, this.heightAboveGround)
                
                // this.indexOfClosestLift = idx

                // if(this.up[idx] == true || this.down[idx] == true) {
                //     closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[1]
                //     idx = this.heightAboveGround.indexOf(closest)
                // }

                this.indexOfClosestLift = idx

                // this.changeFloor(btn, this.indexOfClosestLift)
                this.changeFloorWithoutQueue(btn, this.indexOfClosestLift)
            },
        },
        computed: {
            setPlaceFloorBtn() {
                let start = 40
                let arr = [start]

                for(let i = 0; i < this.floorCount; i++) {
                    start += 100
                    arr.push(start)
                }
                return arr
            }
        }
	}
</script>

<style scoped>
    .lift-buttons {
        height: 500px;
        width: 50px;
    }
    .lift-button {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #ffadad;
        border-radius: 50%;
        border: 2px solid #c25205;
        list-style-type: none;
    }
    .lift-button:hover {
        transform: scale(120%);
        background: #ffad77;
        cursor: pointer;
    }
</style>