const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const path = require('path')
const tesseract = require('node-tesseract-ocr')
const imageminMozjpeg = require('imagemin-mozjpeg')

const fileCompression = async (inputFileLocation) => {
  const files = await imagemin([inputFileLocation], {
    destination: path.join(__dirname, process.env.COMPRESSED_FILE_UPLOADED_LOCATION),
    plugins: [
      imageminMozjpeg({ progressive: true }),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
  return files[0].destinationPath
}

const fileOCR = async (destinationPath) => {
  return new Promise(function (resolve, reject) {
    const config = {
      lang: 'eng',
      oem: 1,
      psm: 3
    }
    tesseract.recognize(destinationPath, config)
      .then(data => {
        const resultArray = data.split('\n')
        const index = resultArray.indexOf('Permanent Account Number')
        if (index === -1) {
          return reject('Not a Pan Card')
        } else {
          for (var i = index; i < resultArray.length; i++) {
            if (resultArray[i].length === 10) {
              return resolve(resultArray[i])
            }
          }
        }
        return reject('Not a Pan Card')
      })
      .catch(error => {
        reject(error.message)
      })
  })
}

module.exports = {
  fileCompression,
  fileOCR
}
