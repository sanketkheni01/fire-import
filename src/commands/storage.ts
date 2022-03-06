import { execute } from '@yarnpkg/shell'
import chalk from 'chalk'
import ora from 'ora'
import prompt from 'prompt'
import {
  DownloadFolderFromBucket,
  ExportFirestoreToBucket,
  GCPLogin,
  setGCPProjectId,
  StartFirebaseEmulatorCommand,
} from '../Constants/commands'

async function firestore() {
  // ? Get the firebase project_id
  const { projectId }: { projectId: string } = await prompt.get(['projectId'])
  const spinner = ora('Importing data').start()

  // * Login with GCloud
  await execute(GCPLogin)

  // * Set project id google cloud
  await execute(setGCPProjectId(projectId))

  // * Export firestore data to google cloud bucket (firebase storage)
  await execute(ExportFirestoreToBucket(projectId))

  // * Get folder from google cloud bucket to local storage
  const exitCodeImport = await execute(DownloadFolderFromBucket(projectId))

  // ? only run if the data is imported successfully
  if (exitCodeImport === 0) {
    spinner.succeed('Import successful')
    console.log(chalk.yellowBright('FireStore data imported 🔥🔥🔥🎉🎉🎉'))
    console.log(
      chalk.green('Run following command to import data to fireStore')
    )
    console.log(chalk.black.bgYellow(StartFirebaseEmulatorCommand))
    spinner.stop()
  } else {
    spinner.fail('Import failed')
  }
}

export default firestore
