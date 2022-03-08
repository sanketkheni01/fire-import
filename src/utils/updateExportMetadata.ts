import fs from 'fs-extra'
import createFirebaseExportFile from './createFirebaseExportFile.js'

export default async function updateExportMetadata(key: string, value: any) {
  let isFileExists = await fs.pathExists(
    './firebaseExport/firebase-export-metadata1.json'
  )
  if (isFileExists) {
    await updateData(key, value)
  } else {
    await createFirebaseExportFile()
    await updateData(key, value)
  }
}

async function updateData(key: string, value: string) {
  let metadataExport = await fs.readJson(
    './firebaseExport/firebase-export-metadata.json'
  )
  metadataExport[key] = value
  await fs.writeJson(
    './firebaseExport/firebase-export-metadata.json',
    metadataExport
  )
}
