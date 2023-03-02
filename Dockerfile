# base image
FROM node:14

# set working directory
WORKDIR /app

EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

# https://github.com/imagemin/optipng-bin/issues/97
ENV CPPFLAGS="-DPNG_ARM_NEON_OPT=0"

ENTRYPOINT ["/app/docker-entry.sh"]
