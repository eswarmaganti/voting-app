FROM node:22-bullseye-slim

# setting the working directory
WORKDIR /app

# copying the package.json files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# installing the dependencies
RUN cd frontend && npm install 
RUN cd backend && npm install

# copy and provide the permission to node user
COPY --chown=node:node frontend/ ./frontend/
COPY --chown=node:node backend/src ./backend/src

# build the frontend
RUN cd frontend && npm run build

# expose the 5050 port
ENV PORT=5050

CMD ["node", "backend/src/server.js"]