# Farmers Connect setup

## Backend setup

```
cd  backend


# database setup

sudo apt-get install libmysqlclient-dev

mysql -u your_mysql_username -p

# Once logged in, run the following SQL command to create a new database:

CREATE DATABASE farmers_connect;


# create and activate virtual environment

python3 -m venv .venv

source .venv/bin/activate


# Install python packages

pip install -r requirements.txt


# Migrate Database Schema

python manage.py makemigrations

python manage.py migrate


# to run the app use

python manage.py runserver


```

## Frontend setup

```
cd  frontend

npm install

<!-- how to run  react application -->

npm run dev

```
