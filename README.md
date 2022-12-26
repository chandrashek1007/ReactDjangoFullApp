# ReactDjangoFullApp

# Backend Configuration

## Step 1: Set up virtual environment

First, we install the virtual environment using pip. Then created a virtual environment. You can create it anywhere in your system. At last, activate the environment.

```sh
pip install virtualenv
virtualenv backend
backend\scripts\activate
```
## Step 2: Download and Install packages
Using pip install the dependency pacakages mentioned in "requirements.txt" required to run the project

```sh
cd backend
pip install -r requirements.txt
```
## Step 3: Create Postgresql Database and configure the settings
1. Install Postgres : https://phoenixnap.com/kb/install-postgresql-windows
2. Create new Database from command line or any DB editor
```sh
CREATE DATABASE electricity_applications;
```

## Step 4:  Open "backend/eletricityApplication/settings.py" in any code editor and update 
database settings as mentioned below

```sh
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'electricity_applications',
        'USER': '<Enter your Username>',
        'PASSWORD': '<Enter your Password>,
        'HOST': 'localhost',
        'PORT': '5433',  # or 5432 depend upon the local config 
    }
}
```
## Step 5:  Make Migration to create table in Database
Run the below command to create tables
```sh
pip manage.py makemigrations
pip manage.py migrate
```
## Step 6. Upload data to the table 
Create one migration script "backend/load_csv_data/load_csv_data.py" to upload the shared csv file in database tables . To run below commands need to executed

```sh
python manage.py runscript load_csv_data/load_csv_data.py
```
## Step 7. Run the Backend Server
Execute below command to run the server
```sh
python manage.py runserver
```

# Frontend Configuration

## Step 1: Install Node.js 
Download link : https://nodejs.org/en/download/

## Step 2. Navigate to frontend code in "frontend\argon-dashboard-react-master" directory
```sh
cd frontend\argon-dashboard-react-master
```
## Step 3. Install node modules using pacakge.json
```sh
npm i 
or
npm i --force
```
## Step 4: Start React App
```sh
npm start
```
## Start 5: Validate the app is running in browser in location "http://localhost:3000/admin/index"



