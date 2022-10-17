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

        <LiftBox :heightAboveGround="heightAboveGround" :up="up" :down="down" :blink="blink"/>
    </div>
</template>

<script>

    import LiftBox from './LiftBox.vue'

    export default {
        props: {
            floorCount: Number,
            heightAboveGround: Number,
            up: Boolean,
            down: Boolean,
            blink: Boolean
        },  
        methods: {
            
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
            }
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
</style>