import React from 'react';
import Chart from "react-google-charts";

export default class DatasetGChart extends React.Component {
  render() {
    return (

      <div>
        <h1>{this.props.title}</h1>
        <h5>{this.props.description}</h5>
        <Chart
          chartType={this.props.chartType}
          spreadSheetUrl={this.props.datasetUrl}
          spreadSheetQueryParameters={{
            headers: 1,
            query: 'SELECT K,J LIMIT 5 OFFSET 8', // need this dynamically
          }}
          options={{
            // hAxis: {
            // format:'short'
            // },
            vAxis: {
              format: 'long',
            },
          }}
          
        />
      </div>
    );
  }
}