# Trying out react-native in Docker-container

## Setup

The react-native app needs to know your private local IP address to be able to fetch data from the express server that is running on localhost.

Open up your wifi network properties.
![Properties of your wifi network](/react-native/react_native/assets/2.png)

Scroll down and copy your IP address (IPv4).
![List of properties](/react-native/react_native/assets/3.png)

Create two files .env
- in folder root folder Spark-Webapp/.
- in folder folder Spark-Webapp/react_native.

Add your IP address as a variable in both .env files:
`IP="xxx.xxx.x.xx"`

## Docker
Start up Docker desktop.
In the project directory, you can then run:

### `docker-compose up`
Docker will start up containers with the express server and the react-native app.

### `docker-compose down`
Docker will stop the containers.