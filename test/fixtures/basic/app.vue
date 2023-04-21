<script setup>
  import { createInstance as createInstanceBrowser } from "@amplitude/analytics-browser"
  import { createInstance as createInstanceNode } from "@amplitude/analytics-node"
</script>

<template>
  <div>
    <p>isAmplitudeAvailable: {{ Boolean($amplitude) ? '✅':'❌' }}</p>
    <p>isAmplitudeBrowser: {{ $amplitude?.createInstance === createInstanceBrowser ? '✅':'❌' }}</p>
    <p>isAmplitudeNode: {{ $amplitude?.createInstance === createInstanceNode ? '✅':'❌' }}</p>
  </div>
</template>


