import type { Types as AmplitudeBrowserTypes } from '@amplitude/analytics-browser'
import type { Types as AmplitudeNodeTypes } from '@amplitude/analytics-node'


export type BrowserConfig = {
  apiKey: string
  userId?: string
  options?: AmplitudeBrowserTypes.BrowserOptions
}

export type NodeConfig = {
  apiKey: string
  options?: AmplitudeNodeTypes.NodeOptions
}


