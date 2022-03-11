const path = require('path')

module.exports = {
  buildRenamer : function(filePath, fileName, bundle, bundleGraph, config, options) {
    // filePath is output bundle default filepath
    //      ex : /root/.../dist/my-file.js
    // fileName is default fileName, or previous function transformed fileName
    //      ex : my-file.5c13ab.css
    // bundle -> @see Parcel's Bundle object
    // bundleGraph -> @see Parcel's BundleGraph object
    // config -> @see Parcel's config object
    // options -> @see Parcel's options object

    // Append the build version if specified
    if ( bundle.type === 'js' && process.env.BUILD_VERSION_V1) {
      const parsed = path.parse(fileName)
      return `${parsed.name}-${process.env.BUILD_VERSION_V1}${parsed.ext}`
    }

    return null // -> Will use next parcel namer from .parcelrc
  }
}
