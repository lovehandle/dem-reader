# DEM-Reader

Provides a wrapper to reading elevation data from DEM files at specific positions

Configuration
-------------

Default options:
```
  var defaults = {
    "path": "",
    "num_bytes": 4,
    "num_cols": 10812,
    "num_rows": 10812,
    "min_x": 0,
    "max_x": 0,
    "min_y": 0,
    "max_y": 0
  }
```

Option Explanation:

`path`

The path of the DEM file you are trying to read (e.g. ~/floatn38w123_13.flt).

`num_bytes`

The number of bytes each row/col is composed of.

`num_cols`

The number of columns present in your DEM file. You can view number of columns by running ``gdalinfo YOUR_DEM_FILE_PATH``

`num_rows`

The number of rows present in your DEM file. You can view number of rows by running ``gdalinfo YOUR_DEM_FILE_PATH``

`min_x`

The minimum x-coordinate present within the DEM file. You can view the minimum x-coordinate by running ``gdalinfo YOUR_DEM_FILE_PATH``

`max_x`

The maximum x-coordinate present within the DEM file. You can view the maximum x-coordinate by running ``gdalinfo YOUR_DEM_FILE_PATH``

`min_y`

The minimum y-coordinate present within the DEM file. You can view the minimum y-coordinate by running ``gdalinfo YOUR_DEM_FILE_PATH``

`max_x`

The maximum y-coordinate present within the DEM file. You can view the maximum y-coordinate by running ``gdalinfo YOUR_DEM_FILE_PATH``

## Usage

Instantiate a new reader


```
  var reader = new DEMReader(options)
  reader.read(-122.4183, 37.7750, function (num) { return num } )
  #=> 37.223793029785156 (meters)
```
