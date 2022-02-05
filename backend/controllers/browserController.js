import asyncHandler from 'express-async-handler'
import Path from 'path'
import FS from 'fs'

let Files = []
const allFiles = (Directory) => {
  FS.readdirSync(Directory).forEach((File) => {
    const Absolute = Path.join(Directory, File)
    if (FS.statSync(Absolute).isDirectory()) {
      return allFiles(Absolute)
    } else {
      return Files.push(Absolute)
    }
  })
  return Files
}

//@desc Get all files name
//@route GET /api/files
//@access Public

const ThroughDirectory = asyncHandler(async (req, res) => {
  res.json(JSON.stringify(allFiles('uploads')))
})

export { ThroughDirectory }
