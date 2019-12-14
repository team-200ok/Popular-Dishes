ULTIMATE GOAL: containerized my popularDishes component

1. Create the image for the popular dish component
2. Pull mysql image from DockerHub
3. I moved the dockerfile from

QUESTION:

1. Where should i put this dockerfile? Does it containerize everything include the node modules if I put it in the root directory?
2. ERROR: when I was trying build the image for populardishes component

```
warning babel-jest > @jest/transform > jest-haste-map > fsevents@1.2.9: One of your dependencies needs to upgrade to fsevents v2: 1) Proper nodejs v10+ support 2) No more fetching binaries from AWS, smaller package size
error An unexpected error occurred: "Refusing to download the git repo {\"hostname\":\"github.com\",\"protocol\":\"git:\",\"repository\":\"git://github.com/reactorcore/eslint-config-hackreactor.git\"} over plain git without a commit hash".

```

    - fixed it when I removed 'RUN yarn install RUN yarn global add nodemon' from the dockerfile

2. ERROR: I was trying to run the popularDishes container

```
npm ERR! missing script: start

```

- I tried to add docker-compose.yml file and running the compose-up command
- it seem to have built the image
- but it's still not running the container

3. ERROR 2003 (HY000): Can't connect to MySQL server on '172.17.0.3' (60)

Can't connect to the mysql db with the following command

```
docker run --rm -d -e MYSQL_ROOT_PASSWORD=yourpassword -p 3325:3306 --name mysql_test mysql:latest
```

4. Running the following command to access mysql in the container

```

docker exec -it popular-dishes-docker_database_1 bash
```

5. Finally seeding my db. then i was having issue running my 'npm start' command

- I did it manually by 'docker start [container]'. starting the service then run the following command
- 'docker exec -it [container] npm run start'

6. Having lots of troubles using mysql (without mysquelize)

7. adding volumes to load schema into database

```
    volumes:
      - ./schema.sql:/docker-entrypoint-initdb.d/schema.sql

```

8. Having troubles initializing mySQL with schema

- added the schema in the init/db directory instead of using volumes
- had troubles with using volumes with database on AWS

