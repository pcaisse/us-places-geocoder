# U.S. Places Geocoder

Static geocoder that returns coordinates (lat/long) for places in the United States.

## Usage

This package exposes a function called `searchByPlaceName` which takes a case-insensitive
place name (or place name prefix) and returns a list of matching place names and their coordinates
sorted by population by default.

For example, here are the search results for "phila":

```node
> searchByPlaceName("phila")
[
  {
    populationRank: 58,
    name: 'Philadelphia, PA',
    coordinates: [ 40.0093755, -75.1333459 ],
    geolevel: 'city'
  },
  {
    populationRank: 59,
    name: 'Philadelphia County, PA',
    coordinates: [ 40.0093755, -75.1333459 ],
    geolevel: 'county'
  },
  {
    populationRank: 6024,
    name: 'Philadelphia, MS',
    coordinates: [ 32.7751057, -89.1220453 ],
    geolevel: 'city'
  },
  {
    populationRank: 12642,
    name: 'Philadelphia, NY',
    coordinates: [ 44.1539885, -75.7097899 ],
    geolevel: 'city'
  },
  {
    populationRank: 14471,
    name: 'Philadelphia, TN',
    coordinates: [ 35.6790503, -84.3999137 ],
    geolevel: 'city'
  },
  {
    populationRank: 30289,
    name: 'Philadelphia, MO',
    coordinates: [ 39.8350512, -91.741179 ],
    geolevel: 'city'
  },
  {
    populationRank: 32165,
    name: 'Philadelphia, IN',
    coordinates: [ 39.782295, -85.8440385 ],
    geolevel: 'city'
  }
]
```

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
then maintain that integration; a service which may, at some point in the future, cease to exist.
You may also want offline support. Plus, place names don't change very often, populations are fairly
stable, and a megabyte isn't as big as it used to be.

If you are only concerned with places in the U.S. and don't need lookup at the address level, this geocoder could work well for you (and is very, very fast compared to a network call!).

One distinct downside to using a static geocoder is the JSON payload size (currently 1.36 MB) which
will increase the size of your JavaScript bundle proportionately if you use this package.

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

# Download 2020 population data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_population_data 2010 2020 /tmp/data-files"

# Process 2020 population data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$HOME/Downloads/static-geocoder/2024/population-files:/tmp/population-files static-geocoder bash -c "./process_population_files 2020 /tmp/data-files /tmp/population-files"

# Download 2024 places data
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files static-geocoder bash -c "./download_places 2024 /tmp/data-files"

# Process all files into JSON
docker run --volume=$(pwd)/scripts:/usr/src/app --volume=$HOME/Downloads/static-geocoder/2024/data-files:/tmp/data-files --volume=$HOME/Downloads/static-geocoder/2024/population-files:/tmp/population-files --volume=$(pwd)/static:/tmp/places-json static-geocoder bash -c "./process_files 2024 /usr/src/app/data/fips_code_labels.json /tmp/data-files /tmp/population-files /tmp/places-json"
```

## Acknowledgements

Thanks to [ComputerBread](https://www.youtube.com/@ComputerBread) for these videos describing the
trie and radix trie implementations:
- [Trie - The data structure behind autocomplete (Prefix tree)](https://www.youtube.com/watch?v=Prnpv7eAAXQ)
- [Compressed trie](https://www.youtube.com/watch?v=qakGXuOW1S8)
