import type * as AmplitudeBrowser from '@amplitude/analytics-browser'

declare module '#app' {
  interface NuxtApp {
    $amplitude: AmplitudeBrowser
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $amplitude: AmplitudeBrowser
  }
}

export {}
