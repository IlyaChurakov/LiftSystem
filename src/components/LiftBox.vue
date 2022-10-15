<template>
    <div 
        class="lift" 
        :style="{
            transform: `translateY(-${heightAboveGround}px)`
        }"
        :class="{ waiting: blink }"
        ref="lift"
    >
        <div class="floorCounter">{{ getCounter }}</div>
        <div class="arrow">
            <img 
                class="arrow-up" 
                :style="{
                    display: up === true ? 'block' : 'none'
                }" 
                src="@/assets/up-arrow.png">
            <img 
                class="arrow-down"
                :style="{
                    display: down === true ? 'block' : 'none'
                }" 
                src="@/assets/down-arrow.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LiftBox',
        props: {
            heightAboveGround: Number,
            up: Boolean,
            down: Boolean,
            blink: Boolean
        },
        methods: {
            
        },
        computed: {
            getCounter() {
                return Math.round(this.heightAboveGround / 100) + 1
            }
        }
	}
</script>

<style scoped>
    .lift {
        position: absolute;
        width: 90px;
        height: 100px;
        background: #c25205;
        bottom: 0;
        left: 3px;
        border-radius: 5px;
    }
    .waiting {
        animation: blink 1000ms infinite;
    }
    .floorCounter {
        width: 20px;
        height: 20px;
        background: rgb(255, 255, 255);
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        margin: 0 auto;
        margin-top: 10px;
    }
    .arrow {
        width: 30px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 45px;
    }
    .arrow img {
        width: 100%;
    }
    .arrow-up {
        display: none;
    }
    .arrow-down {
        display: none;
    }

    @keyframes blink {
        0% { background-color: #c25205; }
        50% { background-color: #ffb380; }
        100% { background-color: #c25205; }
    }
</style>