FROM node
RUN npm install serve -g
RUN npm install pm2 -g
RUN npm install nodemon -g
USER node
WORKDIR /home/node/app
# RUN npm install
# VOLUME . /usr/src/app
# PORT
EXPOSE 3000
# ENTRYPOINT ["npm","i"]
# ENTRYPOINT ["pm2","start","ecosystem.config.js"]
# CMD [ "node", "server.js" ]
