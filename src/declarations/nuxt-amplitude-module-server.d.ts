import type * as AmplitudeNode from '@amplitude/analytics-node'

declare module '#app' {
  interface NuxtApp {
    $amplitude: AmplitudeNode
  }
}

declare module "nitropack" {
  interface NitroApp {
    $amplitude: AmplitudeNode
  }
}

export {}
