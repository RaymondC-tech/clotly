# blueprint for docker image

# containers allow us to package app and all dependencies into a single image

# this docker file defines what goes on in the enviornment inside container

# Docker images are recursive so we are building our own docker image using other images
# allowing reusability 

# We copy package.json and package-lock.json before copying rest of code is from
# docker's layer caching mechanism (docker build images in layers and each step in Docker file 
# creates a layer and Docker can reuse previous layers from previous builds which speeeds it up)

#Stage 1: Build stage (build the app)

# 1. Use official node runtime as BASE image (image is like blueprint for container that
#    will run our code)
FROM node:18 AS builder

#2. Set working directory in the container to /app
WORKDIR /app

#3 Copy package.json and package-lock.json into working directory
COPY package*.json ./

#4. Install needed packages specificed in package.json / dependecies
RUN npm install

#5. Bundle app source inside docker image
COPY . .

#6. Built the app
RUN npm run build 
# compiles Typescript into Javascript inside dist directiory

#Stage 2: Production stage (run the app)

#1. Use official node runtime as base image
FROM node:18

# 2. install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

#3. Set working directory
WORKDIR /app

# 4. Copy package.json and package-lock.ison into working directory
COPY package*.json ./

#5. install only production dependencies
RUN npm install --only=production

#6. Copy built app from builder stage
COPY --from=builder /app/dist ./dist

#7 Make port 3000 available outside this container
EXPOSE 3000

#8. Define command to run app using CMD which defined runtime
CMD [ "npm", "run", "serve" ]   

#npm run serve instead of npm start to compile files from /dist directory (size is smaller
# since we only include compiled files instead of source files)