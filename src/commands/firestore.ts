import { execute as executey } from '@yarnpkg/shell'
import chalk from 'chalk'
import ora from 'ora'
import {
	deleteFireStoreFolderBucket,
	DownloadFolderFromBucket,
	ExportFirestoreToBucket,
	setGCPProjectId,
	StartFirebaseEmulatorCommand,
} from '../Constants/index.js'
import execute from '../utils/execute.js'
import getProjectId from '../utils/getProjectId.js'
import handleGCPLogin from '../utils/handleGCPLogin.js'
import updateExportMetadata from '../utils/updateExportMetadata.js'

async function firestore() {
	// * Getting firebase project id
	const projectId = await getProjectId()
	const spinner = ora('Importing data').start()

	// * Manage login with GCloud
	await handleGCPLogin()

	// * Set project id google cloud
	await execute(setGCPProjectId(projectId), () => {})

	// * Export firestore data to google cloud bucket (firebase storage)
	await execute(ExportFirestoreToBucket(projectId), () => {})

	await updateExportMetadata('firestore', {
		path: 'firestore_export',
		metadata_file: 'firestore_export/firestore_export.overall_export_metadata',
	})

	// * Get folder from google cloud bucket to local storage
	const exitCodeImport: number = await executey(
		DownloadFolderFromBucket(projectId)
	)

	// ? only run if the data is imported successfully
	if (exitCodeImport === 0) {
		await execute(deleteFireStoreFolderBucket(projectId), () => {})
		spinner.succeed('Import successful')
		console.log(chalk.yellowBright('FireStore data imported 🔥🔥🔥🎉🎉🎉'))
		console.log(
			chalk.green('Run following command to import data to firebase emulator')
		)
		console.log(chalk.black.bgYellow(StartFirebaseEmulatorCommand))
		spinner.stop()
		// ! Remove firestore folder from the storage server
	} else {
		spinner.fail('Import failed')
	}
}

export default firestore
