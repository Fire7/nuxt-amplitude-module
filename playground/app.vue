<script setup>
  const { $amplitude } = useNuxtApp()

  if (process.server && $amplitude) {
    $amplitude.track('SSR setup')
    console.log('SSR setup @amplitude/analytics-node track')
  }

  if (process.client && $amplitude) {
    $amplitude.track('CSR setup')
    console.log('CSR setup @amplitude/analytics-browser track')
  }

  const makeExampleApiCall = async () => {
    const result = await $fetch('/api/example')
    console.log('Example api call')
    console.log(result)
  }

</script>

<template>
  <div>
    <p>Example page</p>
    <p>isAmplitudeAvailable: {{ Boolean($amplitude) ? '✅':'❌' }}</p>
    <button @click="makeExampleApiCall">
      Example api call
    </button>
  </div>
</template>
