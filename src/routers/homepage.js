const express = require('express')
const router = express.Router()
const multer = require('multer')
const { fileCompression, fileOCR } = require('../util/checker')

router.get('/', (req, res) => {
  res.render('homepage')
})

const upload = multer({
  dest: process.env.ORIGINAL_FILE_UPLOADED_LOCATION
})

router.post('/get-pan-card-number', upload.single('fileUpload'), async (req, res) => {
  const destinationPath = await fileCompression(req.file.path)
  await fileOCR(destinationPath).then((result) => {
    res.send(result)
  }).catch((error) => {
    res.send(error)
  })
})

module.exports = router
