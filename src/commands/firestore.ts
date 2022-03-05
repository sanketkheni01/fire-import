import { execute } from '@yarnpkg/shell'
import chalk from 'chalk'
import ora from 'ora'
import prompt from 'prompt'

async function firestore() {
  const { projectId } = await prompt.get(['projectId'])
  const spinner = ora('Importing data').start()
  await execute(`gcloud auth login`)
  await execute(`gcloud config set project ${projectId}`)
  await execute(
    `gcloud firestore export gs://${projectId}.appspot.com/firebaseExport`
  )
  const exitCodeImport = await execute(
    `gsutil -m cp -r gs://${projectId}.appspot.com/firebaseExport .`
  )
  console.log(exitCodeImport)
  if (exitCodeImport === 0) {
    spinner.succeed('Import successful')
    console.log(chalk.yellowBright('FireStore data imported 🔥🔥🔥🎉🎉🎉'))
    console.log(
      chalk.green('Run following command to import data to fireStore')
    )
    console.log(
      chalk.black.bgYellow(
        'firebase emulators:start --import=./firebaseExport --export-on-exit=./firebaseExport'
      )
    )
    spinner.stop()
  } else {
    spinner.fail('Import failed')
  }
}

export default firestore
