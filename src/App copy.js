
import React, {Component} from 'react';
import Chart from "react-google-charts";

import './App.css';

function App() {
  return (
    <div className="App">

<Chart
  chartType="ScatterChart"
  //spreadSheetUrl="https://docs.google.com/spreadsheets/d/1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA/edit#gid=0"
  //spreadSheetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
  spreadSheetUrl="https://docs.google.com/spreadsheets/d/15jwjt-Ei5f72iaNsGMoABFzDtw1pLrwUHFYZKV6BI-U/edit?usp=sharing"
  spreadSheetQueryParameters={{
    headers: 1,
    //query: 'SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8',
    query: "'SELECT C, J LIMIT 10'",
  }}
  options={{
    hAxis: {
      format: 'short',
    },
    vAxis: {
      format: 'decimal',
      // format:'scientific'
      // format:'long'
      // format:'percent'
    },
  }}
  rootProps={{ 'data-testid': '1' }}
/>


<Chart
  chartType="ColumnChart"
  //spreadSheetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
  spreadSheetUrl="https://docs.google.com/spreadsheets/d/15jwjt-Ei5f72iaNsGMoABFzDtw1pLrwUHFYZKV6BI-U/edit?usp=sharing"
  spreadSheetQueryParameters={{
    headers: 1,
    //query: 'SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8',
    query: 'SELECT C, J LIMIT 10',
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



<Component
  initialState={{ dataLoadingStatus: 'loading', chartData: [] }}
  didMount={async function(component) {
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

export default App;


