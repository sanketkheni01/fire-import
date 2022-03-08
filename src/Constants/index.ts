export const StartFirebaseEmulatorCommand =
  'firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport'

export const StartFirebaseEmulatorCommandAll =
  'firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport'

export const GCPLogin = 'gcloud auth login'

export const setGCPProjectId = (projectId: string) =>
  `gcloud config set project ${projectId}`

export const ExportFirestoreToBucket = (projectId: string) =>
  `gcloud firestore export gs://${projectId}.appspot.com/firestore_export/`

export const DownloadFolderFromBucket = (projectId: string) =>
  `gsutil -m cp -r gs://${projectId}.appspot.com/firestore_export ./firebaseExport/`

export const getFirebaseExportPath = (path?: string) =>
  path ? `firebaseExport/${path}` : 'firebaseExport'

export const getFirebaseBucketLocalPath = (path?: string) =>
  path
    ? `firebaseExport/storage_export/${path}`
    : 'firebaseExport/storage_export'

export const firebaseStorageBlobsPath = './firebaseExport/storage_export/blobs/'

export const firebaseStorageMetadataPath =
  './firebaseExport/storage_export/metadata/'

export const getGoogleAuthTokenCommand = 'gcloud auth print-access-token'

export const deleteFireStoreFolderBucket = (projectId: string) =>
  `gsutil rm -r gs://${projectId}.appspot.com/firestore_export/`
