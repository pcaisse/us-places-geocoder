# U.S. Places Geocoder

Static geocoder that returns coordinates (lat/long) for places in the United States.

Includes:
- All 50 states
- District of Columbia
- American Samoa
- Guam
- Commonwealth of the Northern Mariana Islands
- Puerto Rico
- U.S. Virgin Islands

Types of supported places:
- States
- Outlying areas under U.S. sovereignty
- Counties
- Incorporated Places
- Census Designated Places

Note that this geocoder does not work for address lookup!

## Why Static?

Typically, geocoding is provided as a service via an API that you pay for and interact with using an
API key.

But sometimes you don't want to rely on another another service that you need to integrate with and
then maintain that integration and which may, some time in the future, cease to exist. You may also
want offline support. Plus, place names don't change very often and megabytes aren't as big as they
used to be.

If you are only concerned with places in the U.S. and don't need lookup at the address level, this geocoder could work well for you (and is very very fast compared to a network call!).

## Development

### Requirements

- Docker
- Node v22.13+

### Building Places JSON Locally

First make sure Docker is installed.

Then run:

```
# Build container
docker build -t static-geocoder .

# Download 2024 data
docker run --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_places 2024 /tmp/data-files"

# Process all files into JSON
docker run --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$(pwd)/static:/tmp/places-json static-geocoder bash -c "./process_files 2024 /usr/src/app/fips_code_labels.json /tmp/data-files /tmp/places-json"
```
