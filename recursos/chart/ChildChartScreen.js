import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  alturaSD3neg,
  alturaSD2neg,
  alturaSD0,
  alturaSD2,
  alturaSD3,
  pesoSD3neg,
  pesoSD2neg,
  pesoSD0,
  pesoSD2,
  pesoSD3,
} from "../../utilitarios/Constants";
import HighchartsReactNative from "@highcharts/highcharts-react-native";
import { Grid, Col, Input, Tab, Tabs, TabHeading, Text } from "native-base";

class Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPage: 1,
      tabactivo: 1,
      alturaChartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        yAxis: {
          title: {
            text: "(cm)",
          },
        },
        xAxis: {
          title: {
            text: "(días)",
          },
          type: "date",
          labels: {
            overflow: "justify",
          },
        },
        chart: {
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 1,
          },
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
            pointStart: 0,
          },
        },
        series: [
          {
            name: "SD3neg",
            data: alturaSD3neg,
            color: "#000000",
          },
          {
            name: "SD2neg",
            data: alturaSD2neg,
            color: "#FF0000",
          },
          {
            name: "SD0",
            data: alturaSD0,
            color: "#56FF9A",
          },
          {
            name: "SD2",
            data: alturaSD2,
            color: "#FF525C",
          },
          {
            name: "SD3",
            data: alturaSD3,
            color: "#00D9FF",
          },
          {
            name: props.navigation.state.params.primerNombreApellido,
            data: props.navigation.state.params.historicoEstatura,
            color: "#EFEF09",
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
                  verticalAlign: "top",
                },
              },
            },
          ],
        },
      },
      pesoChartOptions: {
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        yAxis: {
          title: {
            text: "(kg)",
          },
        },
        xAxis: {
          title: {
            text: "(días)",
          },
          type: "date",
          labels: {
            overflow: "justify",
          },
        },
        chart: {
          scrollablePlotArea: {
            minWidth: 700,
            scrollPositionX: 1,
          },
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
            pointStart: 0,
          },
        },
        series: [
          {
            name: "SD3neg",
            data: pesoSD3neg,
            color: "#000000",
          },
          {
            name: "SD2neg",
            data: pesoSD2neg,
            color: "#FF0000",
          },
          {
            name: "SD0",
            data: pesoSD0,
            color: "#56FF9A",
          },
          {
            name: "SD2",
            data: pesoSD2,
            color: "#FF525C",
          },
          {
            name: "SD3",
            data: pesoSD3,
            color: "#00D9FF",
          },
          {
            name: props.navigation.state.params.primerNombreApellido,
            data: props.navigation.state.params.historicoPeso,
            color: "#EFEF09",
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
                  verticalAlign: "top",
                },
              },
            },
          ],
        },
      },
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const ctipoChart = navigation.getParam("ctipoChart", "");

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
            <View style={styles.container}>
              <HighchartsReactNative
                styles={styles.container}
                options={this.state.pesoChartOptions}
              />
            </View>
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
                options={this.state.alturaChartOptions}
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
