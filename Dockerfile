FROM ghcr.io/osgeo/gdal:ubuntu-small-3.10.1

# Install jq
RUN apt-get update && \
  apt-get install -y nodejs jq

# Copy over data processing files
RUN mkdir -p /usr/src/app
COPY scripts /usr/src/app
WORKDIR /usr/src/app
