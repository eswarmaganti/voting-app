
# for mongodb container
docker run -d \
--name mongodb-server \
-p 27018:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin123 \
mongo:latest


# for voting app container
docker run -d \
--name voting-app \
-p 5051:5050 \
-e PORT=5050 \
-e MONGODB_URI=mongodb://admin:admin123@mongodb-server:27017/voting-app-db?authSource=admin \
--link mongodb-server \
voting-app:latest