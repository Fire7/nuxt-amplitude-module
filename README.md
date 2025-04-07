<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: nuxt-amplitude-module
- Description: My new Nuxt module
-->

# nuxt-amplitude-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Amplitude module for Nuxt.

<!-- - [✨ &nbsp;Release Notes](/CHANGELOG.md) -->
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-amplitude-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Nuxt 3 support
- Amplitude typescript support
- Works with client-side ([@amplitude/analytics-browser](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/)) and server-side ([@amplitude/analytics-node](https://www.docs.developers.amplitude.com/data/sdks/typescript-node/))
- Available in nitro

## Quick Setup

1. Add `nuxt-amplitude-module` dependency to your project

```bash
# Using pnpm
pnpm add nuxt-amplitude-module

# Using yarn
yarn add nuxt-amplitude-module

# Using npm
npm install nuxt-amplitude-module
```

2. Add `nuxt-amplitude-module` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-amplitude-module'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Configuration

You can pass initial amplitude properties in `nuxt.config`:

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-amplitude-module'
  ],
  amplitude: {
      client: {
          apiKey: 'YOUR_AMPLITUDE_API_KEY',
      },
      server: true
  }
})
```

### client
 - Type: `boolean | object`
 - Default: `true`

`true` value means that amplitude plugin will only includes in Nuxt and you need to initialize it manually by calling `$amplitude.init` method ([doc](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#initialize-the-sdk))

> ⚠️ @amplitude/browser is client-side plugin and only available in browser environment after render finished

Object configuration can apply next options: 

|                    | Prop                                                                                                                                                |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey             | API Key of Amplitude                                                                                                                                |
| userId (optional)  | Initialize Amplitude instance with user id                                                                                                          |
| options (optional) | The rest configs you can use simply same to Amplitude-Browser https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#configuration |


### server
- Type: `boolean | object`
- Default: `false`

`true` value means that amplitude plugin will only includes in Nuxt and you need to initialize it manually by calling `$amplitude.init` method ([doc](https://www.docs.developers.amplitude.com/data/sdks/typescript-node/#initialize-the-sdk))

> ⚠️ @amplitude/node is server-side plugin and only available in server environment while ssr or by nitro in `server/*` folder

Object configuration can apply next options:

|                    | Prop                                                                                                                                          |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey             | API Key of Amplitude                                                                                                                          |
| options (optional) | The rest configs you can use simply same to Amplitude-Node https://www.docs.developers.amplitude.com/data/sdks/typescript-node/#configuration |

# Usage example

```vue
<script setup>
const { $amplitude } = useNuxtApp()

if (process.server) {
  $amplitude.track('SSR setup') // @amplitude/node track
}

if (process.client) {
  $amplitude.track('CSR setup') // @amplitude/browser track
}
</script>

<template>
  <div>
    <button @click="$amplitude.track('click')">Track click</button>
  </div>
</template>
```

# Usage example nitro

```js
export default defineEventHandler(async evt => {
  const { $amplitude } = useNitroApp()
  
  $amplitude.track('server event handle')

  return { ok: true }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-amplitude-module/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-amplitude-module

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-amplitude-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-amplitude-module

[license-src]: https://img.shields.io/npm/l/nuxt-amplitude-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-amplitude-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
