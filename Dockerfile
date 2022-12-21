FROM node:16-buster-slim
# FROM ubuntu:20.04

COPY ./react_native /react_native/
# COPY ./react_native/package*.json /react_native/
WORKDIR /react_native


EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

RUN npm i --force && npm i -g expo-cli
CMD [ "npx", "expo", "start" ]