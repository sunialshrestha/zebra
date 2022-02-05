import express from 'express'
const router = express.Router()
import path from 'path'

router.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  //checking file mime types is image
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(
    path.extname(req.files.upload.name).toLowerCase(),
  )
  const mimeType = fileTypes.test(req.files.upload.mimetype)
  if (!extname || !mimeType) {
    return res.status(400).send('Image file allowed : jpg, jpeg and png')
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.upload

  let fileName = `image-${Date.now()}${path.extname(sampleFile.name)}`

  // Use the mv() method to place the file somewhere on your server
  //sampleFile.mv(`uploads/blogs/${sampleFile.name}`, function (err) {
  sampleFile.mv(
    path.join(path.resolve(), 'uploads/blogs/', fileName),
    function (err) {
      if (err) return res.status(500).send(err)
      res.json({
        url: `http://127.0.0.1:5000/uploads/blogs/${fileName}`,
      })
    },
  )
})

export default router
