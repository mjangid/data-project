import xlrd
import requests
import json
from flask_restful import Resource, Api
from flask import Flask

dataset_publish_url = "http://httpbin.org/post"
dataset_location = ("dataset.xlsx")
#dataset_location2 = "StatistaDatasets.csv"
dataset_location2 = "StatistaDatasets.xls"

app = Flask(__name__)
api = Api(app)

class Datasets(Resource):
    def get(self):
        print("datasets")
        return read_dataset()
        #conn = db_connect.connect() # connect to database
        #query = conn.execute("select * from employees") # This line performs query and returns json result
        #return {'employees': [i[0] for i in query.cursor.fetchall()]} # Fetches first column that is Employee ID


def read_dataset():
    payload = []
    wb = xlrd.open_workbook(dataset_location2)
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    row_val = {}
    for row_count in range(0, rows):
        for col_count in range(0, cols):
            row_val[col_count] = (sheet.cell_value(row_count, col_count))
        payload.append(row_val)

    return payload
    

def publish_dataset():
    print('Publishing dataset')
    # data_json = json.dumps(payload)
    #response = requests.post(dataset_publish_url, data=data_json)
    print ("response.text")


api.add_resource(Datasets, '/datasets') # Route_1

if __name__ == "__main__":
    app.run(port='5002')
    #read_dataset()
    #publish_dataset()




###################################################

import sys
import xlrd
import requests
import json

dataset_publish_url = "http://httpbin.org/post"
dataset_publish_url2 = "http://localhost:8080/post"
#dataset_location = ("dataset.xlsx")
#dataset_location2 = "StatistaDatasets.csv"
dataset_location2 = "StatistaDatasets.xls"
payload = {}

def read_dataset(dataset_location):
    wb = xlrd.open_workbook(dataset_location)
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    
    # assume first row is header row
    header_val = []
    for count in range(0, cols):
        header_val.append(sheet.cell_value(0, count))

    row_val = {}
    
    for row_count in range(1, rows):
        for col_count in range(0, cols):
            row_val[header_val[col_count]] = sheet.cell_value(row_count, col_count)
        payload[row_count] =  row_val

    print(payload)    

def publish_dataset():
    print('Publishing dataset')
    data_json = json.dumps(payload)
    response = requests.post(dataset_publish_url, data=data_json)
    print (response.text)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("")
        print("")
        print("*****************************")
        print("")
        print("Argument: Excel Path Missing")
        print("")
        print("*****************************")
        print("")

    else:
        excel_path = str(sys.argv[1])
        print('Arguments File Path:', str(sys.argv[1]))
        print('Arguments Sheet Name:', str(sys.argv[2]))
        
        read_dataset(excel_path)
        #publish_dataset()
    
    pause_value = input("Pause")
