import React, {Component} from 'react';
import Chart from "react-google-charts";

export default class DatasetGChart extends React.Component {

  constructor(props) {
    super(props)
    // try {
    //   const response = fetch(this.props.dataset_url)
    //   if (response.ok) { // if HTTP-status is 200-299
    //     // get the response body (the method explained below)
    //     let json = response.json();
    //     console.log(json)
    //   } else {
    //     alert("HTTP-Error: " + response.status);
    //   }
      
    //   console.log(this.response)

    // } catch(err) {
    // console.log(err)
    // }
  }

  // componentDidMount() {
  //   console.log('dataset_url:' + this.props.dataset_url)
  //   const response = fetch('http://jsonplaceholder.typicode.com/users')
  //   console.log(response)
  //   //console.log(response.json())
    
  //   fetch(this.props.dataset_url)
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ json_data: data })
  //   })
  //   .catch(console.log)
  //   console.log('data:' + this.props.data)
  //   console.log('json_data:' + this.props.json_data)

  // }
  
  render() {

    return (

      <div>
        <h1>Hello </h1>
        <>
        Test
        <Component></Component>
        </>
        
        <Chart
          chartType="ColumnChart"
          spreadSheetUrl="https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE"
          //spreadSheetUrl={App.state.urlPath}
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

