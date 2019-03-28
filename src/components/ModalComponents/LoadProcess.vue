<template>
  <transition name="loading">
    <div
      v-if="isLoading"
      class="loading"
    >
      <div class="loading__overflow">
        <div class="loading__text">
          <img
            class="loading__img"
            src="../../assets/ic_sync_green_24px.svg">
          <h2 class="tip">
            Загружаем данные
          </h2>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'LoadProcess',
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  .loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 20px;
    background: rgba(234, 245, 239, 0.8);
    box-shadow: 0 0 20px 20px rgba(234, 245, 239, 0.7);
    z-index: 1100;
    &__overflow {
      display: table;
      text-align: center;
      width: 100%;
      height: 100%;
    }
    &__text {
      display: table-cell;
      // vertical-align: middle;
    }
    &__img {
      width: 50px;
      height: 50px;
      animation: loading linear 2s infinite;
    }
  }

</style>
