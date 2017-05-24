

FROM ubuntu:16.04

WORKDIR /rl/product/media-facebook-ui

COPY . /rl/product/media-facebook-ui

RUN apt-get update; \
  apt-get install -y apt-utils; \
  apt-get install -y npm; \
  apt-get install -y default-jre

EXPOSE 8080

CMD npm start; \
  npm run build; \
  npm run lint; \
  npm run start:test; \
  npm run test:e2e; \
  npm run test:unit
