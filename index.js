var fs     = require('fs')
var Buffer = require('buffer').Buffer
var extend = require('extend')

var defaults = {
  "path":      "",
  "num_bytes": 4,
  "num_cols":  10812,
  "num_rows":  10812,
  "min_x":     0,
  "max_x":     0,
  "min_y":     0,
  "max_y":     0
}

function DEMReader (opts) {
  opts = extend({}, defaults, opts || {})

  this.path      = opts.path
  this.num_bytes = opts.num_bytes
  this.num_cols  = opts.num_cols
  this.num_rows  = opts.num_rows
  this.min_x     = opts.min_x
  this.max_x     = opts.max_x
  this.min_y     = opts.min_y
  this.max_y     = opts.max_y
  this.row_unit  = (this.max_y - this.min_y) / this.num_rows
  this.col_unit  = (this.max_x - this.min_x) / this.num_cols

  this.rows = []
  this.cols = []

  var self = this;

  for (var i = this.num_rows; i > 0; i--) {
    self.rows.push(i * self.row_unit + self.min_y)
  }

  for (var i = 0; i < this.num_cols; i++) {
    self.cols.push(i * self.col_unit + self.min_x) 
  }
}

DEMReader.prototype.findRowIndex = function (y) {
  var self   = this
  var length = this.rows.length

  if (y === this.rows[length - 1]) return length - 1

  for (var i = 0; i < length; i++) {
    var j = i + 1; 

    if (j != length) {
      var row1 = self.rows[i] 
      var row2 = self.rows[j]

      if (y <= row1 && y > row2) return i 
    }
  }
}

DEMReader.prototype.findColIndex = function (x) {
  var self   = this
  var length = this.cols.length

  if (x === this.cols[length - 1]) return length - 1

  for (var i = 0; i < length; i++) {
    var j = i + 1; 

    if (j != length) {
      var col1 = self.cols[i] 
      var col2 = self.cols[j]

      if (x >= col1 && x < col2) return i 
    }
  }
}

DEMReader.prototype.read = function (x,y,cb) {
  var row_index = this.findRowIndex(y)
  var col_index = this.findColIndex(x)
  var self      = this

  fs.open(this.path, 'r', function (status, fd) {
    if (status) throw status

    var buffer   = new Buffer(self.num_bytes)
    var position = row_index * col_index * self.num_bytes

    return fs.readFileSync(fd, buffer, 0, self.num_bytes, position)

  })
}

module.exports = DEMReader
