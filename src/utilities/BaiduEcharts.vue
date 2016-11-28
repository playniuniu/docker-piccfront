<template>
    <div id="chart"></div>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios'
    import geoCoordMap from './geoCoordMap.js'

    export default {
        props: [ 'mapdata' ],
        data() {
            return {
                baidu_echarts: null,
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
                    let option_data = this.convertData(this.mapdata);
                    this.baidu_echarts.setOption(this.initOption(option_data));
                });
            },
            convertData(conv_data) {
                let res = [];
                for (let i=0; i < conv_data.length; i++) {
                    let geoCoord = geoCoordMap[conv_data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: conv_data[i].name,
                            value: geoCoord.concat(conv_data[i].value)
                        });
                    }
                }
                return res;
            },
            initOption(option_data) {
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: (params) => {
                            return params.name + ' : ' + params.value[2] + ' 个虚机';
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x:'right',
                        data:['PICC 虚机概况'],
                        textStyle: {
                            color: '#8492A6'
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 2000,
                        splitNumber: 5,
                        inRange: {
                            color: ['#50a3ba', '#eac736', '#d94e5d']
                        },
                        textStyle: {
                            color: '#8492A6'
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#C0CCDA',
                                borderColor: '#fff'
                            },
                            emphasis: {
                                areaColor: '#99A9BF'
                            }
                        }
                    },
                    series: [
                        {
                            name: 'PICC 虚机概况',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: option_data,
                            symbolSize: 12,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            }
                        }
                    ]
                }
                return option;
            } 
        }
    };
</script>

<style>
    #chart {
        height: 550px;
        width: 700px;
    }
</style>


