# House Plant Hub UI
User interface using the React framework displaying house plant moisture levels for different plants.

## Deploying UI locally

Requirements:
- Node.js v22.4.1+

To download Node.js instructions can be found [here](https://nodejs.org/en/download)

```bash
npm install

npm run build

REACT_APP_HOST_IP_ADDRESS=<IP Address> npm start
```

## Deploying UI via Docker Image

```bash
docker build . -t house-plant-hub-ui

docker run -p 3000:80 house-plant-hub-ui:latest
```
