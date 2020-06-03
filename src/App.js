import React from 'react';
import DatasetGChart from './DatasetGChart'


class App extends React.Component {
  render() {
    return (
      <div id="divid">
        <DatasetGChart
          dataset_url = 'http://127.0.0.1:5002/dataset'
        />
      </div>
    );
  }
}
export default App;
