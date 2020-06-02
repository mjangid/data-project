import React, { Component } from 'react';
import Chart from "react-google-charts";
import DatasetGChart from './DatasetGChart'
import DatasetChart from './DatasetChart'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphQuery: 'SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8',
      dataSourceType: 'google-sheet',
      chartType: 'barChart',
      urlPath: 'https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE',
      chart: true
    };

    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDatasourceChange = this.onDatasourceChange.bind(this);
    this.onChartChange = this.onChartChange.bind(this);

    const chartType = {
      BarChart : "BarChart",
      ColumnChart : "ColumnChart",
      LineChart : "LineChart",
      PieChart : "PieChart"
    }

    Object.freeze(chartType)
  }


  onChartChange(event) {
    console.log(event.target.value)
    this.setState({ chartType: event.target.value });
  }

  onDatasourceChange(event) {
    console.log(event.target.value)
    this.setState({ dataSourceType: event.target.value });
  }

  handleChangeUrl(event) {
    this.setState({ urlPath: event.target.value });
  }


  handleChangeQuery(event) {
    this.setState({ graphQuery: event.target.value });
  }

  handleSubmit(event) {
    console.log("dataSourceType: " + this.state.dataSourceType);
    console.log("chartType: " + this.state.chartType);
    console.log("urlPath: " + this.state.urlPath);
    console.log("graphQuery: " + this.state.graphQuery);
    switch (this.state.chartType) {
      case "barChart":
        return "barChart";
      case "columnChart":
        return "columnChart";
      case "lineChart":
        return "lineChart";
      case "scaterChart":
        return "scaterChart";
      case "pieChart":
        return "pieChart"
      default:
        return "lineChart";
    }
  }

  render() {
    return (
      <div id="divid">
        <form onSubmit={this.handleSubmit}>
          <strong>Datasource Type:</strong>
          <br />
          <label>
            <input type="radio" value="rest-api" checked={this.state.dataSourceType === "rest-api"} onChange={this.onDatasourceChange} />
            <span>Rest API</span>
          </label>
          <br />
          <label>
            <input type="radio" value="google-sheet" checked={this.state.dataSourceType === "google-sheet"} onChange={this.onDatasourceChange} />
            <span>Google Sheet</span>
          </label>
          <br />
          <label>
            <input type="radio" value="excel-api" checked={this.state.dataSourceType === "excel-api"} onChange={this.onDatasourceChange} />
            <span>Excel API</span>
          </label>
          <br />
          <br />

          <input type="text" id="urlPath" value={this.state.urlPath} onChange={this.handleChangeUrl} />

          <br />
          <br />
          <strong>Chart Type:</strong>
          <br />

          <input type="radio" value="barChart" checked={this.state.chartType === "barChart"} onChange={this.onChartChange} />
          <span>Bar Chart</span>
          <br />
          <input type="radio" value="columnChart" checked={this.state.chartType === "columnChart"} onChange={this.onChartChange} />
          <span>Column Chart</span>
          <br />
          <input type="radio" value="lineChart" checked={this.state.chartType === "lineChart"} onChange={this.onChartChange} />
          <span>Line Chart</span>
          <br />
          <input type="radio" value="scaterChart" checked={this.state.chartType === "scaterChart"} onChange={this.onChartChange} />
          <span>Scatterd Chart</span>
          <br />
          <input type="radio" value="pieChart" checked={this.state.chartType === "pieChart"} onChange={this.onChartChange} />
          <span>Pie Chart</span>
          <br />

          <br />

          <input type="text" id="graphQuery" value={this.state.graphQuery} onChange={this.handleChangeQuery} />


          <br />
          <br />
          <input type="button" value="Update Chart" onClick={this.handleSubmit} />
          <br />
          <br />
        </form>


        <DatasetGChart
          dataset_url = 'http://127.0.0.1:5002/dataset'
          title='Column chart for testing'
          description="Column description for testing"
          datasetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
          chartType="ColumnChart"
          chartQury="SELECT K,J LIMIT 5 OFFSET 8"
        />






      </div>





    );
  }
}


class MyChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div> Demo

      <Chart
          chartType="ColumnChart"
          //spreadSheetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
          spreadSheetUrl={App.state.urlPath}
          spreadSheetQueryParameters={{
            headers: 1,
            query: 'SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8',
          }}
          options={{
            // hAxis: {
            // format:'short'
            // },
            vAxis: {
              format: 'long',
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />


      </div>


    );
  }
}

class MatatikaColumnChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>

{/* // read from api which chart library and render that component

1. fetch metadata
2. render chart 
3. chart fetches data  */}
        <Component
          initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
          didMount={async function (component) {
            const COUNTRY_CODE = 'lb'
            const INDICATOR = 'DT.DOD.DECT.CD'
            const response = await fetch(
              'https://api.worldbank.org/v2/countries/' +
              COUNTRY_CODE +
              '/indicators/' +
              INDICATOR +
              '?format=json',
            )
            const json = await response.json()
            const [metadata, data] = json
            {
              /* console.log(data,metadata) */
            }
            const columns = [
              { type: 'date', label: 'Year' },
              { type: 'number', label: 'Debt' },
            ]
            let rows = []
            const nonNullData = data.filter(row => row.value !== null)
            for (let row of nonNullData) {
              const { date, value } = row
              rows.push([new Date(Date.parse(date)), value])
            }
            component.setState({
              chartData: [columns, ...rows],
              dataLoadingStatus: 'ready',
            })
          }}
        >
          {component => {
            return component.state.dataLoadingStatus === 'ready' ? (
              <Chart
                chartType="LineChart"
                data={component.state.chartData}
                options={{
                  hAxis: {
                    format: 'yyyy',
                  },
                  vAxis: {
                    format: 'short',
                  },
                  title: 'Debt incurred over time.',
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            ) : (
                <div>Fetching data from API</div>
              )
          }}
        </Component>
      </div>
    );
  }
}

class MatatikaBarChart extends Component {
  constructor(props) {
    super(props);
    //class data
  }
  render() {
    return (

      <div>
        <h1>Bar Chart</h1>
        <Component
          initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
          didMount={async function (component) {
            const response = await fetch(
              'https://api.exchangeratesapi.io/latest?symbols=USD,GBP,CAD',
            )
            const json = await response.json()
            const rateCurrencyNames = Object.keys(json.rates)
            const rateCurrencyValues = Object.values(json.rates)
            const chartData = [['Currency Name', 'Currency Rate']]
            for (let i = 0; i < rateCurrencyNames.length; i += 1) {
              chartData.push([rateCurrencyNames[i], rateCurrencyValues[i]])
            }
            component.setState({
              dataLoadingStatus: 'ready',
              chartData: chartData,
            })
          }}
        >
          {component => {
            return component.state.dataLoadingStatus === 'ready' ? (
              <Chart
                chartType="BarChart"
                data={component.state.chartData}
                options={{
                  chartArea: {
                    width: '50%',
                  },
                  title: 'EUR Price',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            ) : (
                <div>Fetching data from API</div>
              )
          }}
        </Component>
      </div>
    );
  }

}


class MatatikaLineChart extends Component {
  render() {
    return (
      <div>
        <h1>Line Chart</h1>

        <Component
          initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
          didMount={async function (component) {
            const COUNTRY_CODE = 'lb'
            const INDICATOR = 'DT.DOD.DECT.CD'
            const response = await fetch(
              'https://api.worldbank.org/v2/countries/' +
              COUNTRY_CODE +
              '/indicators/' +
              INDICATOR +
              '?format=json',
            )
            const json = await response.json()
            const [metadata, data] = json
            {
              /* console.log(data,metadata) */
            }
            const columns = [
              { type: 'date', label: 'Year' },
              { type: 'number', label: 'Debt' },
            ]
            let rows = []
            const nonNullData = data.filter(row => row.value !== null)
            for (let row of nonNullData) {
              const { date, value } = row
              rows.push([new Date(Date.parse(date)), value])
            }
            component.setState({
              chartData: [columns, ...rows],
              dataLoadingStatus: 'ready',
            })
          }}
        />


      </div>
    );
  }
}

export default App;
