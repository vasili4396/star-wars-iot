<template>
  <div>
    <page-header/>
    <main>
      <router-view/>
      <error-viewer/>
    </main>
    <footer/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import ErrorViewer from './components/TheErrorViewer'
export default {
  name: 'App',
  components: {
    PageHeader,
    ErrorViewer
  }
}
</script>

<style lang="sass">
  @import "style/sass/main"
</style>
