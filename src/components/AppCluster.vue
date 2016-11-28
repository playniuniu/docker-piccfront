<template>
    <section class="chart-container">
        <baidu-echarts></baidu-echarts>
    </section>
    
</template>

<style>
    .chart-container {
        height: 100%;
    }
</style>

<script>
    import BaiduEcharts from '../utilities/BaiduEcharts.vue'

    export default {
        components: { BaiduEcharts },
    }
</script>