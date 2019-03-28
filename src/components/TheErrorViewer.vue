<template>
  <div>
    <modal-window
      v-if="isRqError"
      size="small"
      menu="ok"
      @close="deleteRqError"
    >
      <div slot="body">
        <h3
          class="mb-2"
          style="text-align: center"
        >
          Ошибка!
        </h3>
        <div style="text-align: center">
          <span>{{ rqError.message }}</span>
        </div>
      </div>
    </modal-window>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ModalWindow from './ModalComponents/ModalWindow'
export default {
  name: 'TheErrorViewer',
  components: {
    ModalWindow
  },
  computed: {
    ...mapGetters([
      'isRqError',
      'rqError'
    ])
  },
  methods: {
    ...mapActions([
      'deleteRqError'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .middle_align {
    text-align: center;
  }
</style>
