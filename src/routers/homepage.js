const express = require('express')
const router = express.Router()
const multer = require('multer')
const { fileCompression, fileOCR } = require('../util/checker')
const path = require('path')

router.get('/', (req, res) => {
  res.render('homepage')
})

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.ORIGINAL_FILE_UPLOADED_LOCATION)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: multerStorage })

router.post('/get-pan-card-number', upload.single('fileUpload'), async (req, res) => {
  const destinationPath = await fileCompression(req.file.path)
  await fileOCR(destinationPath).then((result) => {
    res.send(result)
  }).catch((error) => {
    res.send(error)
  })
})

module.exports = router
