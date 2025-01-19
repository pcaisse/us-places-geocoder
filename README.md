# Static Geocoder

## Development

### Requirements

- Docker

### Building Locally

First make sure Docker is installed.

Then run:

```
# Build container
docker build -t static-geocoder .

# Download 2024 data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_places 2024 /tmp/data-files"

# Process all files into JSON
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$HOME/Downloads/static-geocoder/2024/places-json:/tmp/places-json static-geocoder bash -c "./process_files 2024 /tmp/data-files /tmp/places-json"

# Build geocoder from places JSON
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/places-json:/tmp/places-json --volume=$HOME/Downloads/static-geocoder/2024/geocoder:/tmp/geocoder static-geocoder node build_geocoder.js /tmp/places-json /tmp/geocoder"
```
