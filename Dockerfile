FROM ghcr.io/osgeo/gdal:ubuntu-small-3.10.1

# Install jq
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get update && \
  apt-get install -y nodejs jq

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g csvtojson

# Copy over data processing files
COPY scripts /usr/src/app
