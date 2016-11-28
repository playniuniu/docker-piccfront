<template>
    <div id="chart"></div>
</template>

<script>
    import echarts from 'echarts';
    import axios from 'axios';

    export default {
        props: [ 'edata' ],
        data() {
            return {
                baidu_echarts: null
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
            initMap() {
                axios.get('/assets/echarts/china.json').then( (response) => {
                    echarts.registerMap('china', response.data);
                    this.baidu_echarts = echarts.init(this.$el);
                    axios.get('/assets/echarts/option.json').then( (response) => {
                        this.baidu_echarts.setOption(response.data);
                    });
                });
            }
        }
    };
</script>

<style>
    #chart {
        height: 500px;
        width: 100%;
        margin: 15px auto;
    }
</style>


