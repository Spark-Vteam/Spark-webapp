FROM node:16-buster-slim

COPY ./react_native /react-native/
WORKDIR /react-native

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN npm install && npm install -g expo-cli
CMD [ "npx", "expo", "start" ]