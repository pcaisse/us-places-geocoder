# U.S. Places Geocoder

Static geocoder that returns coordinates (lat/long) for places in the United States.

This package exposes only one function called `searchByPlaceName`, which takes a place name (or place
name prefix) and returns a list of matching place names and their coordinates.

For example, here are the search results for "Philadelphia":

```node
> searchByPlaceName("Philadelphia")
[
  [ 'Philadelphia, TN', [ 35.6790503, -84.3999137 ] ],
  [ 'Philadelphia, PA', [ 40.0093755, -75.1333459 ] ],
  [ 'Philadelphia, NY', [ 44.1539885, -75.7097899 ] ],
  [ 'Philadelphia, MO', [ 39.8350512, -91.741179 ] ],
  [ 'Philadelphia, MS', [ 32.7751057, -89.1220453 ] ],
  [ 'Philadelphia, IN', [ 39.782295, -85.8440385 ] ],
  [ 'Philadelphia County, PA', [ 40.0093755, -75.1333459 ] ]
]
```

You can also search by prefix and the search string is case-insensitive (searching for
"Philadelphia", "Phila", and "phila" will return the same results in this case).

## About

All data is provided by the U.S. Census (see [TIGER/Line
Shapefiles](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)).

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
then maintain that integration, a service which may, at some point in the future, cease to exist.
You may also want offline support. Plus, place names don't change very often and a megabyte isn't as
big as it used to be.

If you are only concerned with places in the U.S. and don't need lookup at the address level, this geocoder could work well for you (and is very, very fast compared to a network call!).

## Development

### Requirements

- Docker
- Node v18+

### Building Places JSON Locally

First make sure Docker is installed.

Then run:

```
# Build container
docker build -t static-geocoder .

# Download and process 2023 population data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_and_process_population_data 2020 2023 /tmp/data-files"

# Download 2024 places data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_places 2024 /tmp/data-files"

# Process all files into JSON
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$(pwd)/static:/tmp/places-json static-geocoder bash -c "./process_files 2024 /usr/src/app/data/fips_code_labels.json /tmp/data-files /tmp/places-json"
```

## Acknowledgements

Thanks to [ComputerBread](https://www.youtube.com/@ComputerBread) for these videos describing the
trie and radix trie implementations:
- [Trie - The data structure behind autocomplete (Prefix tree)](https://www.youtube.com/watch?v=Prnpv7eAAXQ)
- [Compressed trie](https://www.youtube.com/watch?v=qakGXuOW1S8)
