FROM node:16-buster-slim

COPY ./react_native /react-native/
WORKDIR /react-native

RUN npm install && npm install -g expo-cli && npm i @expo/ngrok@^4.1.0
CMD [ "npx", "expo", "start", "--tunnel" ]