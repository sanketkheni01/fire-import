import fs from 'fs-extra'
import { getFirebaseExportPath } from '../Constants/index.js'
import execute from './execute.js'

export default async function createFirebaseExportFile() {
  // ! remove firebase storage and use this function only for creating file
  let firebaseObj = {
    version: null,
  }

  await execute('firebase --version', function (output: any) {
    firebaseObj.version = output
  })

  if (!firebaseObj.version) {
    return console.error(
      '❌ Unable to find firebase cli version, please install firebase cli with "npm install -g firebase-tools"'
    )
  }

  fs.ensureDirSync(getFirebaseExportPath())
  fs.writeJsonSync(
    getFirebaseExportPath('firebase-export-metadata.json'),
    firebaseObj
  )
}
