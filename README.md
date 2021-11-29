# Kusari

Named after the Japanese word for 'chain', this project sets out to consolidate investors Cryptocurrency investments into one application. Users can see their live balance from multiple chains including Ethereum, Binance Chain, and Bitcoin. We've structured the application to allow us to scale the number of chains we're consuming data from, as well as swap out API providers where needed.

In the space of 2 weeks, our team picked up a number of completely new frameworks, including a language we didn't have experience in before (Python). The team put in the hours, and we're excited to showcase the final result of the project in the below demo.

## Kusari Demo

[![Kusari Demo](https://img.youtube.com/vi/pigj0cxPyOQ/0.jpg)](https://www.youtube.com/embed/pigj0cxPyOQ?start=1)

## The Team

A special thanks to the Team:

[![Mabon](https://img.icons8.com/nolan/25/github.png)](https://github.com/Maby0) Mabon |
[![David](https://img.icons8.com/nolan/25/github.png)](https://github.com/mandyvuong) David |
[![Gianluca](https://img.icons8.com/nolan/25/github.png)](https://github.com/GianlucaAnsaldi) Gianluca |
[![Paul](https://img.icons8.com/nolan/25/github.png)](https://github.com/Paul72187) Paul |
[![Tom](https://img.icons8.com/nolan/25/github.png)](https://github.com/tomal02) Tom |
[![Ed](https://img.icons8.com/nolan/25/github.png)](https://github.com/EMDevelop) Ed |

We held daily Standups and Retros, as well as adapting to remote working using a 24-7 discord dropin room.

## Technology

#### Frontend

We build the front end in React, using Javascript, and styled using SCSS and various codepens, which were fairly attributed in our code.

#### Backend

We chose the Django framework to handle our 3rd party API requsts, using Python to consume various API's mentioned below.

#### Database

We used Postgres to store User credentials, as well as to store and associate cryptocurrency wallets to users.

#### Hosting

We're in the process of hosting on AWS using Docker:

## To Run

- Clone the Repo: `Git Clone https://github.com/EMDevelop/investment-tracker.git`

#### Start App

- Also reference: "Requirements" section

- Enter the repository: `cd Kusari`
- Navigate into the frontend directory and install packages:`cd frontend && npm install`
- Navigate to the backend: `cd .. && cd backend`
- Start your virtual environment and install pip variables: `pipenv install`
- Migrate DB with `python3 manage.py migrate`
- Open 2 terminal windows:
  - 1st terminal, start react: `npm run client`
  - 2nd terminal, start django: `npm run server`

#### Requirements

- A version of Node and NPM
- A version of Python and Django (preferably 3.7 or higher)
- Setup your environment:
  - Add a `.env` file at the followig path: `Kusari/backend/.env`
  - Within the `.env` file, add the following dependencies

* Note, you will need to create your own API keys, they are all free, most have API call limits.

```
MORALIS_API_KEY=
MORALIS_NODE_KEY=
CRYPTOCOMPARE_API_KEY=
COVALENT_API_KEY=
PG_USER=postgres
PG_PASSWORD=
PG_PORT=5432
TEMP_DIR=/tmp
```

- Once you've entered your virtual environment:
  - Manually Install Dependencies: `pipenv install django djangorestframework django-cors-headers requests django-dotenv pytest`
  - Sometimes you'll need to install psycopg2 manually: `pip install psycopg2`

#### Testing

To run Django tests:

- Navigate to the backend and run `./manage.py test crypto`
