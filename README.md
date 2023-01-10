# Spark-webapp

This is a sub module of the Spark project. It contains code for the mobile application. Follow instructions below to start up the mobile application only. To start up all backend and frontend applications, follow the the README instructions in the [main Spark repo](https://github.com/Spark-Vteam/Spark-Project) instead.

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webapp/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webapp/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webapp/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Spark-Vteam/Spark-webapp/build-status/main)
[![Node.js CI](https://github.com/Spark-Vteam/Spark-webapp/actions/workflows/node4.js.yml/badge.svg)](https://github.com/Spark-Vteam/Spark-webapp/actions/workflows/node4.js.yml)

## Setup

The react-native app needs to know your private local IP address (IPv4) to be able to fetch data from the express server that is running on localhost.

If you are unsure of how to find your local IP check [this link](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address).

Create two files .env
- in folder root folder Spark-Webapp (to be able to start up dockerized react-native through expo LAN)
- in folder Spark-Webapp/react_native (to be able to fetch data from backend on localhost)

Add your IP address as a variable in both .env files:
`IP="xxx.xxx.x.xx"`

## Using the application

In Spark-webapp you can log into your account. From there you will be able to view avaiable bikes to rent as well as stations and different kind of zones (for example parking zones and no-driving zones). You can rent a bike and stop the rent when you are finished. Finally, you can plot routes while renting a bike by selecting stations or different positions on the map.

### `npm start`
Starts up the application. Open App in Expo Go by scanning the QR code or manually enter URL `<your IP>`:19000.

### `npm test`
Performs unit tests with jest and creates coverage report that can be viewed in file `react_native/coverage/Icov-report/index.html`.

### `npm lint`
Performs linter test.