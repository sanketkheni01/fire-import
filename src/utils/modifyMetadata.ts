export default function modifyMetadata(obj: any) {
  let new_metadata = obj
  new_metadata.contentEncoding = 'identity'
  new_metadata.downloadTokens = []
  new_metadata.downloadTokens.push(obj.metadata?.firebaseStorageDownloadTokens)
  delete new_metadata.kind
  delete new_metadata.metadata?.firebaseStorageDownloadTokens
  delete new_metadata.id
  delete new_metadata.selfLink
  delete new_metadata.mediaLink
  delete new_metadata.timeStorageClassUpdated
  return new_metadata
}
