import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Button, Dimensions, View, TouchableOpacity, Text } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import { spitColor, splitData } from "../../utils/helpers";
import * as Colyseus from '../../utils/colyseus';
import { chartData } from '../../utils/data';
import { Table } from "../../components";
const { width, height } = Dimensions.get("window");

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
}

function getTime() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var H = today.getHours();
    var m = today.getMinutes();


    today = mm + '/' + dd + '/' + yyyy + ' ' + H + ':' + m;
    return today;
}

function convertTimetoDate(unix_timestamp) {

    var date = new Date(unix_timestamp);

    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.user = { subID: 'LZTFN141980', token: '0KSnwgyCA4e8mSlFQurmTLpmuIRRdTTiUlAcGASY' };
        this.client = new Colyseus.Client('wss://socketnew.redboxtrade.com/');
    }

    onRef = ref => {
        if (ref) {
            this.chart = ref;
        }
    };

    onData = param => { };

    initChart = room => {
        room.onMessage((message) => {
            switch (message.action) {
                case 'connect':

                    break;
                case 'sv-payment':

                    break;
                case 'updateBalance':

                    break;
                case 'main':
                    var today = new Date();
                    var s = today.getSeconds();
                    var _time = toTimestamp(getTime()) + 30000;
                    if (s < 30) {

                        _time = toTimestamp(getTime());
                    }

                    let dataTest = [];

                    message.data.chart.BTCUSDT.forEach(item => {
                        var timer = convertTimetoDate(_time);
                        dataTest.push([timer, item.open, item.close, item.low, item.low, item.volume]);
                        _time = _time - 30000;
                    });

                    dataTest = dataTest.reverse();

                    let dataFormat = splitData(dataTest);

                    var Zstart = width <= 768 ? 40 : 20;
                    var Zend = 100;
                    var KNAME;
                    var data = dataFormat;
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


                    MA1 = MA(3, data.datas, 1);
                    MA2 = MA(5, data.datas, 1);
                    MA3 = MA(10, data.datas, 1);

                    var highlab = [40, 0], lowlab = [-40, 0];

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
                                    "color": '#333333'
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
                                "show": true,
                                "lineStyle": {
                                    "color": '#ccc'
                                }
                            },
                            "axisLabel": {
                                "show": true,
                                "textStyle": {
                                    "color": 'black'
                                }
                            },
                            "splitLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": 'rgb(242 242 242 / 0.09)',
                                    width: 1,
                                    "type": 'dashed'
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
                                    "color": '#333333'
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
                                    "color": '#333333'
                                }
                            },
                            "axisLabel": {
                                "show": false,
                                "textStyle": {
                                    "color": '#333333'
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
                                    "color": '#333333'
                                }
                            },
                            "splitLine": {
                                "show": false,
                                "lineStyle": {
                                    "color": '#333333',
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
                            "color": '#333333',
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
                                type: "candlestick",
                                name: "Daily",
                                data: data.datas,
                                "itemStyle": {
                                    "color": color1,
                                    "color0": color2,
                                    "borderColor": color1,
                                    "borderColor0": color2
                                },

                                markPoint: {
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
                                        "color": '#ffffff',
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
                                            "position": window.innerWidth <= 768 ? "insideMiddleBottom" : "center",
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


                            },

                            {
                                type: "line",
                                name: "MA3",
                                data: MA1[0],
                                smooth: true,
                                showSymbol: false,
                                lineStyle: {
                                    width: 1,
                                    color: "rgb(142 197 253 / 0.5)"
                                }
                            },
                            {
                                "type": "line",
                                "name": 'MA5',
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
                                "name": 'MA10',
                                "data": MA3[0],
                                smooth: true,
                                showSymbol: false,
                                lineStyle: {
                                    width: 1,
                                    color: "rgb(0 118 255)"
                                }
                            },
                            {
                                "type": "bar",
                                "name": "Volume",
                                "xAxisIndex": 1,
                                "yAxisIndex": 1,
                                // 'stack': true,
                                "data": spitColor(data),
                                // 'stack': 'colorbyvalue',
                                "barCategoryGap": "40%",
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
                                "color": '#333333'
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
                            "left": "1%",
                            "right": "8%",
                            "top": "80%",
                            "width": width <= 800 ? width <= 480 ? "80%" : "91%" : "",
                            "bottom": width <= 768 ? "10%" : height <= 500 ? "10%" : "4%",
                            "borderColor": 'blue',
                        },
                        {
                            "show": false,
                            "left": "0.5%",
                            "top": "75%",
                            "right": "15%",
                            "bottom": "9%",
                            "borderColor": 'green',
                        },
                        {
                            "left": "92%",
                            "right": "0%",
                            // "height": "60%",
                            "bottom": "35%",
                            "borderColor": 'transparent',
                        }
                        ]
                    };

                    this.chart.setOption(option);

                    break;
                case 'order':
                    console.log(message)
                    break;
                case 'alert':
                    break;
            }
        });


    };

    handleSocketServer = () => {
        this.client.joinOrCreate('my_room', this.user).then(room => this.initChart(room));
    };

    componentDidMount() {
        this.handleSocketServer();
    }

    render() {
        return (
            <SafeAreaView style={styles.chartContainer}>
                <View style={{flex: 0.5}}>
                    <ECharts
                        option={{}}
                        ref={this.onRef}
                        additionalCode={this.additionalCode}
                        onData={this.onData}
                        width={width}
                    />
                </View>
                <Table style={{flex: 0.5}}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});