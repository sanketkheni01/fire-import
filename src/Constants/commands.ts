export const StartFirebaseEmulatorCommand =
  'firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport'

export const GCPLogin = 'gcloud auth login'

export const setGCPProjectId = (projectId: string) =>
  `gcloud config set project ${projectId}`

export const ExportFirestoreToBucket = (projectId: string) =>
  `gcloud firestore export gs://${projectId}.appspot.com/firebaseExport`

export const DownloadFolderFromBucket = (projectId: string) =>
  `gsutil -m cp -r gs://${projectId}.appspot.com/firebaseExport .`
