import sys
import xlrd
import datetime
import requests
import json
from flask_restful import Resource, Api
from flask import Flask
import datetime


dataset_publish_url = "http://httpbin.org/post"
dataset_statistca = "../datasource/StatistaDatasets.xlsm"
dataset_covidcase = "../datasource/confirmed_cases.xls"
dataset_covid_full = "../datasource/full_data.xls"

app = Flask(__name__)
api = Api(app)

class Datasets(Resource):
    def get(self):
        return read_dataset(dataset_statistca)

class Covid(Resource):
    def get(self):
        return read_dataset(dataset_covidcase)

class CovidFull(Resource):
    def get(self):
        return read_dataset(dataset_covid_full)


api.add_resource(Datasets, '/datasets')
api.add_resource(Covid, '/covid')
api.add_resource(CovidFull, '/covidfull')


def read_dataset(dataset_location):
    payload = []
    wb = xlrd.open_workbook(dataset_location)
    print(dataset_location)
    if len(wb.sheet_names()) < 1:
        return ""
    sheet = wb.sheet_by_index(0)
    rows = sheet.nrows
    cols = sheet.ncols
    
    # assume first row is header row
    header_val = []
    for count in range(0, cols):
        header_val.append(sheet.cell_value(0, count))
    # print(header_val)

    row_val = {}
    
    for row_count in range(1, rows-1):
        for col_count in range(0, cols-1):
            col_name = header_val[col_count]
            cell_value = sheet.cell_value(row_count, col_count)

            if (col_name == "date" or col_name == "last_update"):
                try:
                    py_date = datetime.datetime(*xlrd.xldate_as_tuple(cell_value, wb.datemode))
                    row_val[col_name] = str(py_date)
                except Exception as e:
                    print(e.args)
            else:
                row_val[col_name] = cell_value
        payload.append(row_val)

    return payload
    

def publish_dataset():
    print('Publishing dataset')
    # data_json = json.dumps(payload)
    #response = requests.post(dataset_publish_url, data=data_json)
    print ("response.text")




if __name__ == "__main__":

    '''
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
        excel_sheet = str(sys.argv[2])
        print('Arguments File Path:', excel_path)
        print('Arguments Sheet Name:', excel_sheet)
        
        #read_dataset(excel_path, excel_sheet)
    ''' 
    
    app.run(port='5002')
    