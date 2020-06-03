import sys
import datetime
import requests
import json
from flask_restful import Resource, Api
from flask import Flask
from flask_cors import CORS, cross_origin
import datetime



app = Flask(__name__)
api = Api(app)
CORS(app)


def covid_data():
    rows = []
    row = {}
    row['Country'] = 'United States'
    row['Confirmed Case'] = 1831730
    row['Confirmed Death'] = 106180
    row['Confirmed Recovered'] = 463868
    rows.append(row)

    row['Country'] = 'Brazil'
    row['Confirmed Case'] = 555383
    row['Confirmed Death'] = 31199
    row['Confirmed Recovered'] = 223638
    rows.append(row)
    
    row['Country'] = 'Russia'
    row['Confirmed Case'] = 423741
    row['Confirmed Death'] = 5037
    row['Confirmed Recovered'] = 186602
    rows.append(row)

    row['Country'] = 'United Kingdom'
    row['Confirmed Case'] = 277985
    row['Confirmed Death'] = 39369
    row['Confirmed Recovered'] = 1224
    rows.append(row)

    row['Country'] = 'Spain'
    row['Confirmed Case'] = 239932
    row['Confirmed Death'] = 27127
    row['Confirmed Recovered'] = 150376
    rows.append(row)

    row['Country'] = 'Italy'
    row['Confirmed Case'] = 233515
    row['Confirmed Death'] = 33530
    row['Confirmed Recovered'] = 160092
    rows.append(row)

    row['Country'] = 'India'
    row['Confirmed Case'] = 207615
    row['Confirmed Death'] = 5815
    row['Confirmed Recovered'] = 100285
    rows.append(row)

    row['Country'] = 'France'
    row['Confirmed Case'] = 188450
    row['Confirmed Death'] = 28940
    row['Confirmed Recovered'] = 68930
    rows.append(row)

    row['Country'] = 'Germany'
    row['Confirmed Case'] = 182370
    row['Confirmed Death'] = 8551
    row['Confirmed Recovered'] = 166609
    rows.append(row)

    row['Country'] = 'Peru'
    row['Confirmed Case'] = 170039
    row['Confirmed Death'] = 4634
    row['Confirmed Recovered'] = 69257
    rows.append(row)

    return rows

class Dataset(Resource):
    def get(self):
        payload = []
        json_data = {}
        chart_options = {}
        json_data['chart_library'] = 'Google Chart'
        json_data['chart_type'] = 'BarChart'
        #json_data['data_url'] = 'http://127.0.0.1:5002/data'
        json_data['data_url'] = 'https://docs.google.com/spreadsheets/d/1XWJLkAwch5GXAt_7zOFDcg8Wm8Xv29_8PWuuW15qmAE'

        spreadSheetQueryParameters = {}
        spreadSheetQueryParameters['headers'] = '1'
        spreadSheetQueryParameters['query'] = 'SELECT A, H, O, Q, R, U LIMIT 5 OFFSET 8'
        json_data['spreadSheetQueryParameters'] = spreadSheetQueryParameters

        chart_options['title'] = 'This is chart title'
        vAxis = {}
        hAxis = {}
        hAxis['title'] = 'Year'

        titleTextStyle = {}
        titleTextStyle['color'] = '#333' 
        hAxis['titleTextStyle'] = titleTextStyle
        chartArea = {}
        chart_options['hAxis'] = hAxis

        vAxis['minValue'] = 0
        chart_options['vAxis'] = vAxis

        chartArea['width'] = '50%'
        chartArea['height'] = '70%'
        chart_options['chartArea'] = chartArea

        json_data['chart_config'] = chart_options
        payload.append(json_data)
        return json_data
        #return payload

class Data(Resource):
    def get(self):
        return covid_data()

api.add_resource(Dataset, '/dataset')
#api.add_resource(Data, '/barchart')
#api.add_resource(Data, '/linechart')
#api.add_resource(Data, '/columnchart')
api.add_resource(Data, '/data')



if __name__ == "__main__":
    app.run(port='5002')
    