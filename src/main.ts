import * as core from '@actions/core'
import {createHash} from 'crypto'

async function run(): Promise<void> {
  try {
    const inputPackages = core.getInput('packages', {required: true})
    const chunks = inputPackages.trim().split(' ')
    const cleanedPackages = chunks.map(chunk => chunk.trim())
    const payload = cleanedPackages.sort().join('$')
    const hasher = createHash('sha256')
    hasher.update(payload)
    const digest = hasher.digest('hex')
    core.setOutput('digest', digest)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unknown error occurred.')
    }
  }
}

run()
