FROM node:19

# Working Directory
WORKDIR /usr/src/app

# Copy Package JSON Files
COPY package*.json ./

# Insall Prettier (for our package's build function)
RUN npm install prettier -g

# Intall dependencies
RUN npm install

# Copy source files
COPY . .

# Build
# RUN npm run build

# Expose the API port
EXPOSE 9005

CMD [ "node", "server.js" ]
