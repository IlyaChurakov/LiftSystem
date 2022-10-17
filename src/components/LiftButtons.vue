<template>
    <ul class="lift-buttons">
        <li 
            class="lift-button"
            v-for="btn in floorCount"
            v-bind:key="btn"
            :style="{
                bottom: `${setPlaceFloorBtn[btn - 1]}px`
            }"
            @click="compareLifts(btn)"
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
            heightAboveGround: Array,
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

                this.indexOfClosestLift = idx
                this.changeFloor(btn, this.indexOfClosestLift)
                // this.changeFloorWithoutQueue(btn, this.indexOfClosestLift)
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
        width: 23px;
    }
    .lift-button {
        position: absolute;
        width: 23px;
        height: 23px;
        background: #ffb42a;
        border-radius: 50%;
        list-style-type: none;
    }
    .lift-button::after {
        content: '';
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ea6200;
        transform: translate(4px, 4px);
    }
    .lift-button:hover {
        transform: scale(120%);
        opacity: 0.7;
        cursor: pointer;
    }
    .lift-button:active {
        transform: scale(80%);
        opacity: 1;
        cursor: pointer;
    }
</style>