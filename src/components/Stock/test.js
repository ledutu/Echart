import Echarts from '../Chart';
import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { dataChart } from '../../utils/data';

const { width, height } = Dimensions.get("window");

function splitData(rawData) {
    var datas = [];
    var times = [];
    var vols = [];
    for (var i = 0; i < rawData.length; i++) {
        datas.push(rawData[i]);
        times.push(rawData[i].splice(0, 1)[0]);
        vols.push(rawData[i][4]);
    }
    return {
        datas: datas,
        times: times,
        vols: vols,
    };
}



export default function Chart() {
    var data = splitData(dataChart);
    var KNAME, data;
    var Zstart = width <= 768 ? 40 : 20;
    var Zend = 100;
    var MA1 = 0,
        MA2 = 0,
        MA3 = 0,
        MA4 = 0,
        MA5 = 0,
        MA6 = 0;
    var color1 = "#0CF49B";
    var color2 = "#FD1050";


    function AutoSetMALabel() {
        var mapush = [];
        if (MA1 !== 0) {
            mapush.push('MA' + MA1[1]);
        }
        if (MA2 !== 0) {
            mapush.push('MA' + MA2[1]);
        }
        if (MA3 !== 0) {
            mapush.push('MA' + MA3[1]);
        }
        if (MA4 !== 0) {
            mapush.push('MA' + MA4[1]);
        }
        if (MA5 !== 0) {
            mapush.push('MA' + MA5[1]);
        }
        if (MA6 !== 0) {
            mapush.push('MA' + MA6[1]);
        }
        //console.log(MA2[1]) 
        return mapush
    }

    function MA(dayCount, datas, field) {
        var ma, i, l, j, sum;
        ma = [];
        if (field) {
            for (i = 0, l = datas.length; i < l; i++) {
                if (i < dayCount - 1) {
                    ma.push(NaN);
                    continue;
                }
                sum = 0;
                for (j = 0; j < dayCount; j++) {
                    sum += datas[i - j][field];
                }
                ma.push(sum / dayCount);
            }
        } else {
            for (i = 0, l = datas.length; i < l; i++) {
                if (i < dayCount) {
                    ma.push(NaN);
                    continue;
                }
                sum = 0;
                for (j = 0; j < dayCount; j++) {
                    sum += datas[i - j];
                }
                ma.push(sum / dayCount);
            }
        }
        return [ma, dayCount];
    }

    KNAME = 'BTCEUSDT';

    MA1 = MA(3, data.datas, 1);
    MA2 = MA(5, data.datas, 1);
    MA3 = MA(10, data.datas, 1);

    var highlab = [40, 0], lowlab = [-40, 0];

    // const calculateMA = (dayCount, data) => {
    //     const result = [];
    //     for (let i = 0, len = data.length; i < len; i++) {
    //         if (i < dayCount) {
    //             result.push("-");
    //             continue;
    //         }
    //         var sum = 0;

    //         for (let j = 0; j < dayCount; j++) {
    //             sum += data[i - j][1];
    //         }
    //         result.push(sum / dayCount);
    //     }
    //     return result;
    // };


    // let dates = [];
    // let values = [];

    // if (data) {
    //     data.map((stockData) => dates.push(stockData[0]));
    //     data.map((item) =>
    //         values.push([item[1], item[2], item[3], item[4]], item[5])
    //     );
    // }
    var option = {
        responsive: true,
        maintainAspectRatio: false,
        "tooltip": {
            "show": true,
            "trigger": "axis",
            "triggerOn": "mousemove|click",
            "axisPointer": {
                "type": "cross"
            },
        },
        "xAxis": [{
            "show": true,
            "scale": true,
            "nameGap": 15,
            "gridIndex": 0,
            "splitNumber": 5,
            "axisLine": {
                "lineStyle": {
                    "color": '#4a657a'
                }
            },
            "axisLabel": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "data": data.times,
            "axisPointer": {
                "label": {
                    "show": false,
                }
            },
        },
        {
            "show": true,
            "scale": true,
            "nameGap": 15,
            "gridIndex": 1,
            "splitNumber": 5,
            "axisLabel": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "data": data.times,
            "axisPointer": {
                "label": {
                    "show": false,
                }
            }, //附图1禁用下标显示
        },
        {
            "show": true,
            "scale": true,
            "gridIndex": 2,
            "splitNumber": 5,
            "axisLine": {
                "lineStyle": {
                    "color": '#4a657a'
                }
            },
            "axisLabel": {
                "textStyle": {
                    "color": '#fff'
                }
            },
            "data": data.times,
        },
        {
            "gridIndex": 3,
            "show": false,
            "type": "value",

        }
        ],
        "yAxis": [{
            "position": "right",
            "scale": true,
            "gridIndex": 0,
            "axisLine": {
                "show": false,
                "lineStyle": {
                    "color": '#ccc'
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": '#fff'
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": 'rgb(242 242 242 / 0.09)',
                    width: 1
                    //"type": 'dashed'
                }
            },
        },
        {
            "position": "right",
            "gridIndex": 1,
            "splitNumber": 2,
            "minInterval": 0,
            "axisLine": {
                "lineStyle": {
                    "color": '#4a657a'
                }
            },
            "axisLabel": {

                "textStyle": {
                    "color": '#fff'
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": '4a657a',
                    //"type": 'dashed'
                }
            },
        },
        {
            "position": "right",
            "gridIndex": 2,
            "splitNumber": 3,
            "show": false,
            "axisLine": {
                "lineStyle": {
                    "color": '#fff'
                }
            },
            "axisLabel": {
                "show": false,
                "textStyle": {
                    "color": '#fff'
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": '4a657a',
                    //"type": 'dashed'
                }
            },
        },
        {
            "gridIndex": 3,
            "show": false,
            "type": "category",
            "axisLabel": {
                "showMinLabel": false,
                "formatter": function (val) {
                    return '￥' + val
                },
                "textStyle": {
                    "color": '#fff'
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": '#fff',
                    //"type": 'dashed'
                }
            },
            "axisLine": {
                "show": false,
                "lineStyle": {
                    "color": 'transparent'
                }
            },
        }
        ],
        "title": {
            "text": KNAME,
            "color": '#fff',
            "show": false
        },
        "dataZoom": [{
            "show": false,
            "type": "",
            "start": Zstart,
            "end": Zend,
            "xAxisIndex": [
                0,
                0
            ],
        },
        {
            "show": false,
            "type": "slider",
            "start": Zstart,
            "end": Zend,
            "xAxisIndex": [
                0,
                1
            ],
        },
        {
            "show": false,
            "type": "slider",
            "start": Zstart,
            "end": Zend,
            "xAxisIndex": [
                0,
                2
            ],
        },
        {
            "show": false,
        }
        ],

        "axisPointer": {
            "show": true,
            "type": "line",
            "link": [{
                "xAxisIndex": "all"
            }]
        },
        "toolbox": {
            "Show": false
        },
        "series": [
            {
            // "left": "3%",
            "padding": 5,
            "type": "candlestick",
            "name": "BTCUSDT",
            "xAxisIndex": 0,
            "yAxisIndex": 0,
            "data": data.datas,
            "markPoint": {
                "symbol": 'circle',
                "symbolSize": function (value, param) {
                    let size = 15
                    if (param.name === 'Highest price' || param.name === 'Lowest price') {
                        size = 0.1
                    }
                    return size
                },
                "label": {
                    "show": true,
                    "fontSize": 12,
                    "color": '#fff',
                    "formatter": function (param) {
                        let val = ''
                        if (param.name === 'punctuation') {
                            val = param.value
                        } else if (param.name === 'Lowest price') {
                            val = param.value + ' →'
                            // lowlab = [-40,0]
                        } else if (param.name === 'Highest price') {
                            val = '← ' + param.value
                            // highlab = [-40,0]
                        }
                        return val
                    }
                },
                "data": [{
                    "name": "Highest price",
                    "type": "max",
                    "valueDim": 'highest',
                    "symbolOffset": highlab,
                    "itemStyle": {
                        "color": color2,
                    },
                },
                {
                    "name": "Lowest price",
                    "type": "min",
                    "valueDim": 'lowest',
                    "symbolOffset": lowlab,
                    "itemStyle": {
                        "color": "rgb(41,60,85)",
                    }
                }
                ]
            },
            "markLine": {
                "symbol": "",
                "data": [{
                    "yAxis": data.datas[data.datas.length - 1][1],

                    "label": {
                        formatter: function (d) {
                            return data.datas[data.datas.length - 1][1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
                                '\n'
                                + data.times[data.times.length - 1];
                        },
                        "show": true,
                        "color": "black",
                        "position": width <= 768 ? "insideMiddleBottom" : "",
                        "z-index": 1050,
                        "padding": 2,
                        "borderRadius": 5,
                        "backgroundColor": data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] == 0 ? "orange" : data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] > 0 ? color1 : color2,
                    },
                    "lineStyle": {
                        "color": data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] == 0 ? "orange" : data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] > 0 ? color1 : color2,
                        "width": 1,
                        "type": "dashed"
                    },
                },]
            },
            "itemStyle": {
                "color": color1,
                "color0": color2,
                "borderColor": color1,
                "borderColor0": color2
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[0],
            "data": MA1[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1,
                color: "#fff"
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[1],
            "data": MA2[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1,
                color: "rgb(142 197 253 / 0.5)"
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[2],
            "data": MA3[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1,
                color: "rgb(0 118 255)"
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[3],
            "data": MA4[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[4],
            "data": MA5[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
        {
            "type": "line",
            "name": AutoSetMALabel()[5],
            "data": MA6[0],
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        },
        {
            "type": "bar",
            "name": "Volume",
            "xAxisIndex": 2,
            "yAxisIndex": 2,
            "data": data.vols,
            "barCategoryGap": "20%",
            "itemStyle": {
                "normal": {
                    "color": function (params) {

                        var colorList;
                        var poe = parseFloat(params.name.slice(-2));
                        if (poe == 0) {
                            colorList = "#ccc";

                        } else if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
                            colorList = color1;

                        } else {
                            colorList = color2;

                        }
                        return colorList;
                    },
                }
            },
            "markLine": {
                "symbol": "",
                "data": [{
                    "yAxis": data.vols[data.vols.length - 1],

                    "label": {

                        "show": true,
                        "color": "black",
                        "position": "center",
                        "padding": 3,
                        "borderRadius": 5,
                        "backgroundColor": data.datas[data.vols.length - 1] - data.datas[data.vols.length - 2] == 0 ? "orange" : data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] > 0 ? color1 : color2,
                    },
                    "lineStyle": {
                        "color": data.datas[data.vols.length - 1] - data.datas[data.vols.length - 2] == 0 ? "orange" : data.datas[data.datas.length - 1][1] - data.datas[data.datas.length - 2][1] > 0 ? color1 : color2,
                        "width": 1,
                        "type": "dashed"
                    },
                },]
            }
        },
        {
            "type": "line",
            "xAxisIndex": 3,
            "yAxisIndex": 3,
            "areaStyle": {
                "color": 'red',
                "opacity": .2,
            },
        },
        {
            "type": "line",
            "xAxisIndex": 3,
            "yAxisIndex": 3,
            "areaStyle": {
                "color": 'red',
                "opacity": .2,
            },
        }
        ],
        "legend": [{
            "textStyle": {
                "color": '#fff'
            },
            "data": [AutoSetMALabel()[0], AutoSetMALabel()[1], AutoSetMALabel()[2]],
            "color": 'red',
            "show": true,
            "padding": 5,
            "itemGap": 10,
            "itemWidth": 20,
            "itemHeight": 14,
            "top": "0%",
            "left": width <= 480 ? "15%" : width >= 480 && width <= 580 ? "35%" : "35%",
            "margin": "auto"

        },
        {
            "show": false,
            "padding": 5,
            "itemGap": 10,
            "itemWidth": 25,
            "itemHeight": 14
        }
        ],

        "grid": [{
            "show": false,
            "top": "10%",
            "left": "0.5%",
            "right": "8%",
            "width": width <= 800 ? width <= 480 ? width <= 380 ? "80%" : "87%" : "91%" : "",
            "bottom": "25%",
            "borderColor": 'red',
        },
        {
            "show": false,
            "left": "0.5%",
            "right": "8%",
            "top": "83%",
            "width": width <= 800 ? width <= 480 ? "80%" : "91%" : "",
            "bottom": width <= 768 ? "10%" : height <= 500 ? "10%" : "4%",
            "borderColor": 'blue',
        },
        {
            "show": false,
            "left": "0.5%",
            "top": "75%",
            "right": "8%",
            "bottom": "30px",
            "borderColor": 'green',
        },
        {
            "left": "92%",
            "right": "0%",
            // "height": "60%",
            // "bottom":"35%",
            "borderColor": 'transparent',
        }
        ]
    };

    return (
        <View style={styles.container}>
            <Echarts option={option} width={300} height={300} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});