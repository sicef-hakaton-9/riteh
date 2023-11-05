# Use an official Node.js runtime as the base image
FROM --platform=linux/x86_64 node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your source code from the host into the container at /app
COPY ./src /app
COPY package.json .
COPY .env /app

# Install Node.js dependencies (if your project has a package.json)
# If not, you can remove this line
RUN npm install -g typescript ts-node
RUN npm install

EXPOSE 80 443 8000

# Define a command to start your Node.js application
CMD ["npm", "run", "start-docker"]