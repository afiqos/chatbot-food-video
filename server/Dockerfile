FROM node:15.3.0
RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /srv/app/chatbot-food-video
WORKDIR /srv/app/chatbot-food-video

COPY package.json /srv/app/chatbot-food-video
COPY package-lock.json /srv/app/chatbot-food-video

RUN npm install

COPY . /srv/app/chatbot-food-video

CMD ["npm", "run", "dev"]

