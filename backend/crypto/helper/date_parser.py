from datetime import datetime

def get_time_now_as_string():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def get_date_from_string(string):
    return datetime.strptime(string, "%Y-%m-%d %H:%M:%S")

