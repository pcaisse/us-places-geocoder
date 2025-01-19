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

# Process all files and build geocoder
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$HOME/Downloads/static-geocoder/2024/geocoder:/tmp/geocoder static-geocoder bash -c "./process_files --input /tmp/data-files --output /tmp/geocoder"
```
