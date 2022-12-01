# Spark-webapp

## Setup

The react-native app needs to know your private local IP address to be able to fetch data from the express server that is running on localhost.

Type in `netstat -r` in terminal and find IP address under "Interface" in IPv4 Route Table.

Create two files .env
- in folder root folder Spark-Webapp (to be able to start up dockerized react-native through expo LAN)
- in folder Spark-Webapp/react_native (to be able to fetch data from backend on localhost)

Add your IP address as a variable in both .env files:
`IP="xxx.xxx.x.xx"`

## Docker
Start up Docker desktop.
In the project directory, you can then run:

### `docker-compose up`
Docker will start up containers with the express server and the react-native app.

### `docker-compose down`
Docker will stop the containers.