import React from 'react';
import Chart from "react-google-charts";

export default class DatasetGChart extends React.Component {

  constructor(props) {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    console.log('dataset_url:' + this.props.dataset_url)
    
    
    try {
      const response = await fetch(this.props.dataset_url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json });
      console.log("chart_type" + this.state.data.chart_type)
    } catch (error) {
      console.log(error);
    }

  }
  
  render() {

    return (

      <div>
        <h2>Chart from Google spreadsheet</h2>
      
        <Chart
          chartType={this.state.data.chart_type}
          spreadSheetUrl={this.state.data.data_url}
          spreadSheetQueryParameters={this.state.data.spreadSheetQueryParameters}
          options={this.state.data.chart_config}
        />

      
      </div>

    );
  }
}

