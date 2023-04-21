import { NitroApp } from 'nitropack'
import * as amplitude from '@amplitude/analytics-node'

declare module "nitropack" {
  interface NitroApp {
    $amplitude: typeof amplitude
  }
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  // provide amplitude to nitroApp
  nitroApp.$amplitude = amplitude
})
