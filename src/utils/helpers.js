export const splitData = (rawData) => {
    let datas = [];
    let times = [];
    let vols = [];
    for (let i = 0; i < rawData.length; i++) {
        datas = [...datas, [
            rawData[i][1],
            rawData[i][2],
            rawData[i][3],
            rawData[i][4],
            rawData[i][5],
        ]];
        times = [...times, rawData[i][0]]
        vols = [...vols, rawData[i][5]];
    }
    return {
        datas: datas,
        times: times,
        vols: vols,
    };
};

export const spitColor = (data) => {

    let results = [{
        value: data.vols[0],
        itemStyle: {
            normal: {
                color: '#0CF49B',
            },
        }
    }];

    for (let i = 1; i < data.datas.length; i++) {
        if (data.datas[i][1] > data.datas[i - 1][1]) {
            results = [...results, {
                value: data.vols[i],
                itemStyle: {
                    normal: {
                        color: '#0CF49B',
                    },
                }
            }]

        } else {
            results = [...results, {
                value: data.vols[i],
                itemStyle: {
                    normal: {
                        color: '#FD1050',
                    },
                }
            }]
        }
    }

    return results;
}

export const splitChartData = data => {
    
}