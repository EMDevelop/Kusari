# Investment Tracker

## To Run

```
cd backend
python3 manage.py runserver
```

## Team Instructions

#### Creating a requirements.txt file

You need to go to the root repository, and run the following:

```
pip3 freeze > requirements.txt
```

If we add any dependencies, we will need to run the above statement again.

#### To then run

##### Clone the Repo

- Clone the repo: `git clone https://github.com/EMDevelop/investment-tracker.git`
- Enter the repo: `cd investment-tracker`

##### Install the virtual Environment with the saved requirements

- Create a virtual environment: `python3 -m venv env`
- Activate the virtual environment: `source env/bin/activate`
- Install dependencies from the requirements: `pip3 install -r requirements.txt`
- You might need to upgrade your pip: `python3 -m pip install --upgrade pip`

##### Re-install the React dependancies

- Navigate to the front end: `cd frontend`
- Update the node packages: `npm install`
- Create a build version of the react app (this makes a build directory): `npm run build`

##### Start the server

- now navigate back to the backend `cd ..` and `cd backend`
- run the django server `python3 manage.py runserver`

We're cooking on gas.

```
cd backend
python3 manage.py runserver
```
