import fs from 'fs-extra'
import path from 'path'
import getFiles from '../utils/readFiles.js'

export default async function test() {
  let files = await getFiles('./firebaseExport/storage_export/blobs')
  let __dirname = path.resolve(
    `./firebaseExport/storage_export/blobs/${'de-sd2291d0'}.appspot.com`
  )
  for (let filepath of files) {
    let file_name = filepath.replace(__dirname + '/', '')
    fs.ensureDirSync(
      './firebaseExport/storage_export/metadata/' +
        file_name.substring(0, file_name.lastIndexOf('/') + 1)
    )
    fs.writeJsonSync(
      './firebaseExport/storage_export/metadata/' + file_name + '.json',
      { demp: 'hello' }
    )
  }
}
