FROM ghcr.io/osgeo/gdal:ubuntu-small-3.10.1

# Install Node and jq
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get update && \
  apt-get install -y nodejs jq

# jsdom is used to parse HTML files
RUN npm install -g jsdom

# Copy over data processing files
RUN mkdir -p /usr/src/app
COPY scripts /usr/src/app
COPY data /usr/src/app
WORKDIR /usr/src/app
