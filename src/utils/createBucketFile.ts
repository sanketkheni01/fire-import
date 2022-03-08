import fs from 'fs-extra'
import { getFirebaseBucketLocalPath } from '../Constants/index.js'

export default function createBucketFile(project_id: string) {
  let BucketObj: { buckets: { id: string }[] } = {
    buckets: [],
  }

  BucketObj.buckets.push({
    id: `${project_id}.appspot.com`,
  })

  fs.ensureDirSync(getFirebaseBucketLocalPath())
  fs.writeJsonSync(getFirebaseBucketLocalPath('buckets.json'), BucketObj)
}
