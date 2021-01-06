package constants

// InvalidPath is a file path that should be treated as invalid
var InvalidPath string = "INVALID"

// FSLocationPrefix is the location to be appended within the database for nginx to serve
var FSLocationPrefix = "/file_gateway"

// FSPathPrefix is the file path where files are stored (this should be mounted as volume)
var FSPathPrefix string = "/var/ferryf_FS"

// TimeFormat formats the current datetime into a fs-friendly representation (daily)
var TimeFormat string = "2006-01-02"

// Perms refer to the filesystem permission bits
var Perms = 0755
