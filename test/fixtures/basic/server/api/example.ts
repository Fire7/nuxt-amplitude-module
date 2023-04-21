export default defineEventHandler(async () => {
  const { $amplitude } = useNitroApp()

  return {
    isAmplitudeAvailable: Boolean($amplitude)
  }
})
