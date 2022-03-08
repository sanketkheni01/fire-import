import fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

export default async function getFiles(dir: string) {
  const subdirs = await readdir(dir)
  const files: any = await Promise.all(
    subdirs.map(async (subdir: string) => {
      const res = resolve(dir, subdir)
      return (await stat(res)).isDirectory() ? getFiles(res) : res
    })
  )

  return files.reduce((a: any, f: any) => a.concat(f), [])
}
