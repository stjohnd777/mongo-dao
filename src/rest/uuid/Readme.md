### Building your image
Go to the directory that has your Dockerfile and run the following command to build the Docker image.
###Tag
The -t flag lets you tag your image so it's easier to find later using the docker images command:
```shell
docker build . -t <your username>/node-web-app
```

Your image will now be listed by Docker:

```shell
$ docker images
```

```shell
(base) overman@element-117 uuid % docker images                                 
REPOSITORY                    TAG                            IMAGE ID       CREATED          SIZE
stjohnd007/restfactory-uuid   latest                         b138647f5d44   13 seconds ago   944MB

```

### Run Docker Container
```shell
> docker run -p 8989:8989 -d <your username>/node-web-app
```

Print the output of your app:

### Get container ID
```shell
$ docker ps
```

### Print app output
```shell
$ docker logs <container id>
```

```shell
# Example
Running on http://localhost:8080
If you need to go inside the container you can use the exec command:
```


### Enter the container
```shell
$ docker exec -it <container id> /bin/bash
```