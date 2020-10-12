import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Grid, Col, Input, Tab, Tabs, TabHeading, Text } from "native-base";
import HighchartsReactNative from "@highcharts/highcharts-react-native";

class Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPage: 1,
      tabactivo: 1,
      chartOptions: {
        title: {
          text: "Solar Employment Growth by Sector, 2010-2016",
        },

        subtitle: {
          text: "Source: thesolarfoundation.com",
        },

        yAxis: {
          title: {
            text: "Number of Employees",
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
        },
        chart: {
          zoomType: "x",
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },
        series: [
          {
            name: "Installation",
            data: [
              43934,
              52503,
              57177,
              69658,
              97031,
              119931,
              137133,
              154175,
              43934,
              52503,
              57177,
              69658,
              97031,
              119931,
              137133,
              154175,
              43934,
              52503,
              57177,
              69658,
              97031,
              119931,
              137133,
              154175,
            ],
          },
          {
            name: "Manufacturing",
            data: [24916, 24064, 29742, null, null, 30282, 38121, 40434],
          },
          {
            name: "Sales & Distribution",
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
          },
          {
            name: "Project Development",
            data: [null, null, 7988, 12169, 17310.5, 22452, 34400, 34227],
          },
          {
            name: "Other",
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const ctipoChart = navigation.getParam("ctipoChart", "NO-ID");
    console.log("TEST:params:", ctipoChart);
    if (ctipoChart) {
      switch (ctipoChart) {
        case "Altura":
          this.setState({ initialPage: 1, tabactivo: 1 });
          break;
        case "Peso":
          this.setState({ initialPage: 0, tabactivo: 0 });
          break;
      }
    }
  }
  componentDidUpdate() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs
          locked
          tabContainerStyle={{ height: 40 }}
          tabBarUnderlineStyle={{
            backgroundColor: "black",
            height: 5,
          }}
          initialPage={this.state.initialPage}
          page={this.state.tabactivo}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#A4D4DB" }}>
                <Text
                  style={{ fontSize: 15, color: "black" }}
                  onPress={() => {
                    this.setState({ tabactivo: 0 });
                  }}
                >
                  Peso
                </Text>
              </TabHeading>
            }
          >
            <View></View>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#A4D4DB" }}>
                <Text
                  style={{ fontSize: 15, color: "black" }}
                  onPress={() => {
                    this.setState({ tabactivo: 1 });
                  }}
                >
                  Estatura
                </Text>
              </TabHeading>
            }
          >
            <View style={styles.container}>
              <HighchartsReactNative
                styles={styles.container}
                options={this.state.chartOptions}
              />
            </View>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
  },
});
export default Screen;
