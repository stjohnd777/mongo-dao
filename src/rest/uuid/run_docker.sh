#!/bin/sh
export DOCKER_USER=stjohnd007

#Run the image
#Running your image with -d runs the container in detached mode,
# #leaving the container running in the background.
#
# The -p flag redirects a public port to a private port inside the container.
# Run the image you previously built:

docker run -p 49160:8080 -d $DOCKER_USER/node-web-app

# Print the output of your app:
