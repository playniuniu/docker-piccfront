<template>
    <section class="chart-container">
        <h1 class="title">PICC 数据中心概览</h1>
        <baidu-echarts :mapdata="mapdata"></baidu-echarts>
    </section>
</template>

<style>
    .chart-container {
        flex: 1;
        padding: 10px 0 40px 40px;
        background: #F9FAFC;
    }

    .chart-container .title {
        display: block;
        color: #324057;
        height: 56px;
        line-height: 56px;
        font-size: 22px;
        padding: 0;
        margin: 0 0 -70px 0;
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