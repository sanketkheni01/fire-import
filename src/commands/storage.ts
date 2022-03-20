import axios from 'axios'
import chalk from 'chalk'
import fs from 'fs-extra'
import ora from 'ora'
import path from 'path'
import {
	firebaseStorageBlobsPath,
	firebaseStorageMetadataPath,
	StartFirebaseEmulatorCommandAll,
} from '../Constants/index.js'
import createBucketFile from '../utils/createBucketFile.js'
import execute from '../utils/execute.js'
import getProjectId from '../utils/getProjectId.js'
import handleGCPLogin from '../utils/handleGCPLogin.js'
import modifyMetadata from '../utils/modifyMetadata.js'
import getFiles from '../utils/readFiles.js'
import updateExportMetadata from '../utils/updateExportMetadata.js'

export default async function storage() {
	// * Getting firebase project id
	const projectId = await getProjectId()

	const spinner = ora('Importing data').start()

	// ? Updating "firebase-export-metadata.json"
	await updateExportMetadata('storage', {
		path: 'storage_export',
	})

	// ? Creating "dir/buckets.json"
	createBucketFile(projectId)

	// ? Copying the data from google bucket to local storage
	fs.ensureDirSync(firebaseStorageBlobsPath)
	await execute(
		`gsutil -m cp -r gs://${projectId}.appspot.com ${firebaseStorageBlobsPath}`,
		function (output: any) {
			return
		}
	)

	// ? Reading all the files in blobs folder
	let files = await getFiles(firebaseStorageBlobsPath)

	// * Google auth token
	// * Manage login with GCloud
	let access_token: string | null = await handleGCPLogin()

	if (!access_token) {
		return console.error(
			'❌ Unable to find gcloud access token. please login to gcloud with "gcloud auth login"'
		)
	}

	// ? Getting metadata of files from the server
	let Bucket_folder = path.resolve(
		`${firebaseStorageBlobsPath}${projectId}.appspot.com`
	)
	let url = `https://www.googleapis.com/storage/v1/b/${projectId}.appspot.com/o/`
	const instance = axios.create({
		baseURL: url,
		timeout: 1000,
		headers: {
			host: 'www.googleapis.com',
			authorization: `Bearer ${access_token.replace(/\r?\n|\r/g, '')}`,
			'content-type': 'application/json',
		},
	})

	// ? Creating metadata json files forEach file in blob folder
	for (let filepath of files) {
		let file_name = filepath.replace(Bucket_folder + '\\', '')
		let file_name_uri = file_name.replaceAll('\\', '%2F')

		// * Axios GET request
		const result = await instance.get(file_name_uri, {
			timeout: 5000,
		})
		// location is like =>
		// `./firebaseExport/storage_export/metadata/mydemop-450.appspot.com/`
		fs.ensureDirSync(
			`${firebaseStorageMetadataPath}${projectId}.appspot.com/` +
				file_name.substring(0, file_name.lastIndexOf('\\') + 1)
		)
		// ? Modifying google cloud metadata to firebase metadata
		let modified_metadata = modifyMetadata(result.data)
		fs.writeJsonSync(
			`${firebaseStorageMetadataPath}${projectId}.appspot.com/` +
				file_name +
				'.json',
			modified_metadata
		)
	}
	spinner.stop()

	// ? Command to start firebase emulator
	console.log(chalk.black.bgYellow(StartFirebaseEmulatorCommandAll))
}
