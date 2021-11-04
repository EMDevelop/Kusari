# Investment Tracker

## To Run

- Clone the Repo: `Git Clone https://github.com/EMDevelop/investment-tracker.git`
- Globally install pipenv `sudo -H pip3 install -U pipenv`
- Install Dependencies: `pipenv install django djangorestframework django-cors-headers requests django-dotenv pytest`
- Start Virtual Environment: `pipenv shell`
- Navigate into the frontend directory and install packages`cd frontend && npm install`
- Navigate back into the route directory `cd ..`
- Migrate DB with `python manage.py migrate`
- Open 2 terminal windows:
  - 1st terminal, start react: `npm run client`
  - 2nd terminal, start django: `npm run server`

## Creating A Django API App

I think we should have 1 app per Blockchain or Centralised Exchange (as we add them), and also one for general price fetching.

- prices (general)
- Bitcoin (Blockchain)
- Ethereum (Blockchain)
- Cardano (Blockchain)
- Polkadot (Blockchain)
- Binance (Centralised Exchange)
- Coinbase (Centralised Exchange)
- Kraken (Centralised Exchange)

#### Creating A New App

You will need to:

- open the terminal
- navigate to the relevant folder where your app lives, e.g. `cd backend/crypto`
- create a new App using: `python manage.py startapp prices`
  - `prices` is the name of the app

#### File Structure

- Server
  - Where we will configure new routes for our front end to interact with
  - see backend/server/urls.py
- Crypto
  - This is where we will store our API's for crypto
  - 1 App per chain
- Traditional - This is where we will store our APIs for traditional services
  - Unsure on how to structure this - David?
