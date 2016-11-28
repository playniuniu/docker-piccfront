<template>
    <section class="chart-container">
        <baidu-echarts :mapdata="mapdata"></baidu-echarts>
    </section>
    
</template>

<style>
    .app-container {
        background-color: #00497F;
    }

    .chart-container {
        padding: 40px 30px 0;
    }
</style>

<script>
    import BaiduEcharts from '../utilities/BaiduEcharts.vue'

    export default {
        components: { BaiduEcharts },
        data() {
            return {
                mapdata: [
                    { name: '北京', value: 1930 },
                    { name: '上海', value: 680 },
                    { name: '南京', value: 1465 },
                    { name: '成都', value: 303 },
                    { name: '广州', value: 1103 },
                    { name: '兰州', value: 933 }
                ],
            }
        }
    }
</script>