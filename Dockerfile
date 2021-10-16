# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install --save-dev
RUN npm install react-scripts@latest -g
RUN npm install node-sass@latest


# add app
COPY . ./

# start app
CMD ["npm", "start"]