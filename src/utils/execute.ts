import { exec } from 'child_process'

export default async function execute(command: string, callback: any) {
  return new Promise<void>((resolve, reject) => {
    exec(command, async (error, stdout, stderr) => {
      if (error) {
        // console.error(`exec error: ${error}`)
        reject(error)
      }
      stdout = stdout.substring(0, stdout.length - 1)
      await callback(stdout, stderr)
      resolve()
    })
  })
}
