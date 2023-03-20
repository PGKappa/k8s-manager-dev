RUN="docker run \
    -v $(pwd):/var/www/pgv-manager \
    -w /var/www/pgv-manager \
    node:18-alpine3.15 \
    sh -c "
# $RUN "ls -al "

$RUN "yarn set version berry"
$RUN "yarn install"
$RUN "yarn build"
# $RUN "ls -al"
$RUN "yarn export"


# $RUN "ls -al"
# $RUN "cp -R ./public/manager-assets/js ./src/assets/js"
# $RUN "rm -rf ./public"


# $RUN "cp -R ./images ./src/assets/"
# $RUN "rm -rf images"

# $RUN "cp -R ./mix-manifest.json ./src/assets/mix-manifest.json"
# $RUN "rm -rf mix-manifest.json"