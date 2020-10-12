import React from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import { SD3neg, SD2neg, SD0, SD2, SD3 } from '../../utilitarios/Constants';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

class Screen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartOptions: {
                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },

                yAxis: {
                    title: {
                        text: '(kg)'
                    }
                },

                xAxis: {
                    title: {
                        text: '(meses)'
                    },
                    type: 'date',
                    labels: {
                        overflow: 'justify'
                    }
                },
                chart: {
                    scrollablePlotArea: {
                        minWidth: 700,
                        scrollPositionX: 1
                    },
                    zoomType: 'x'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 0
                    }
                },
                series: [{
                    name: 'SD3neg',
                    data: SD3neg,
                    color: '#000000'
                }, {
                    name: 'SD2neg',
                    data: SD2neg,
                    color: '#FF0000'
                }, {
                    name: 'SD0',
                    data: SD0,
                    color: '#56FF9A'
                }, {
                    name: 'SD2',
                    data: SD2,
                    color: '#FF525C'
                }, {
                    name: 'SD3',
                    data: SD3,
                    color: '#00D9FF'
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'top'
                            }
                        }
                    }]
                }
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <HighchartsReactNative
                    styles={styles.container}
                    options={this.state.chartOptions}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1
    }
});
export default Screen;