<template>
    <div class="lift-buttons">
        <button 
            class="lift-button"
            v-for="btn in floorCount"
            v-bind:key="btn"
            :style="{
                bottom: `${setPlaceFloorBtn[btn - 1]}px`
            }"
            @click="compareLifts(btn)"
        ></button>
    </div>
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
            heightAboveGround: Array
        },
        methods: {
            compareLifts(btn) {
                let btnHeightAboveGround = (btn - 1) * 100
                let arr = [...this.heightAboveGround]
                let closest = arr.sort( (a, b) => Math.abs(btnHeightAboveGround - a) - Math.abs(btnHeightAboveGround - b) )[0];
                let idx = this.heightAboveGround.indexOf(closest)

                console.log(btn, this.heightAboveGround)
                
                this.indexOfClosestLift = idx

                this.changeFloor(btn, this.indexOfClosestLift)
            }
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