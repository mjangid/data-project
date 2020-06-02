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
#app.config['CORS_HEADERS'] = 'application/json'

class Dataset(Resource):
    def get(self):
        json_data = {}
        chart_options = {}
        json_data['chart_library'] = 'Google Chart'
        json_data['chart_type'] = 'BarChart'
        json_data['data_url'] = 'http://127.0.0.1:5002/data'

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
        return json_data

class Data(Resource):
    def get(self):
        json_data = {}
        return json_data

api.add_resource(Dataset, '/dataset')
#api.add_resource(Data, '/barchart')
#api.add_resource(Data, '/linechart')
#api.add_resource(Data, '/columnchart')
api.add_resource(Data, '/data')



if __name__ == "__main__":
    app.run(port='5002')
    