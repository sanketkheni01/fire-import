import fs from 'fs-extra'
import prompt from 'prompt'

export default async function getProjectId() {
	// check the file exists
	let isFileExists = await fs.pathExists('./.firebaserc')
	if (isFileExists) {
		let firebaserc = await fs.readJson('./.firebaserc')
		return firebaserc.projects.default
	}
	isFileExists = await fs.pathExists('./../.firebaserc')
	if (isFileExists) {
		let firebaserc = await fs.readJson('./../.firebaserc')
		return firebaserc.projects.default
	} else {
		// * Getting firebase project id
		const { projectId }: { projectId: string } = await prompt.get(['projectId'])
		return projectId
	}
}
