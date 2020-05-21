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