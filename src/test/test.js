// @ts-check
import assert from 'assert'
import fs from 'fs-extra'
import createFirebaseExportFile from './../../dist/utils/createFirebaseExportFile.js'
import updateExportMetadata from './../../dist/utils/updateExportMetadata.js'

describe('update file', function () {
	it('should create a metadata file with firestore and storage', async function () {
		await createFirebaseExportFile()
		await updateExportMetadata('storage', {
			path: 'storage_export',
		})
		await updateExportMetadata('storage', {
			path: 'storage_export',
		})
		await updateExportMetadata('firestore', {
			path: 'firestore_export',
			metadata_file: 'firestore_export/firestore_export.overall_export_metadata',
		})
		let metadataExport = await fs.readJson(
			'./firebaseExport/firebase-export-metadata.json'
		)
		assert.equal(metadataExport.firestore.path, 'firestore_export')
		assert.equal(metadataExport.storage.path, 'storage_export')
	})

})
