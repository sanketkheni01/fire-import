import fs from 'fs-extra'
import { getFirebaseExportPath } from '../Constants/index.js'
import execute from './execute.js'

export default async function createFirebaseExportFile() {
  let firebaseObj = {
    version: null,
    storage: {
      version: null,
      path: 'storage_export',
    },
  }

  await execute('firebase --version', function (output: any) {
    firebaseObj.version = output
    firebaseObj.storage.version = output
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
