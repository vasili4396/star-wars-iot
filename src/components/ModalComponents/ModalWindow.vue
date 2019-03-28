<template>
  <transition name="modal">
    <div id="modal-window">
      <div class="wrapper">
        <div class="container">
          <div
            class="close-btn"
            @click="$emit('close')">
            <i class="material-icons btn btn_circle btn_danger">clear</i>
          </div>
          <header>
            <slot name="header"/>
          </header>
          <div class="body">
            <slot name="body"/>
          </div>
          <footer class="modal__footer">
            <div v-if="menu==='ok'">
              <button
                class="btn btn_primary btn_large"
                @click="$emit('close')"
              >
                Ок
              </button>
            </div>
            <div v-if="menu === 'checkout'">
              <button
                class="btn btn_primary btn_large"
                @click="$emit('checkout-complete')">
                Подтвердить заказ
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    menu: {
      type: String,
      default: 'cancel_ok'
    }
  },
  mounted () {
    document.body.style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
  #modal-window {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
    overflow: auto;

    .wrapper {
      position: relative;
      max-height: 100vh;
      width: 100%;
      overflow: auto;
      padding: 20px;
    }
    .container {
      position: relative;
      padding-top: 20px;
      width: 500px;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      border-radius: 6px;
      box-sizing: border-box;
    }
    .close-btn {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 1000;
      i { width: 30px; }
    }
    header {
      padding-bottom: 15px;
      padding-right: 20px;
    }
    .body {
      position: relative;
      margin-bottom: 15px;
      padding: 0 40px;
    }
    footer {
      padding: 20px 0px;
      div { text-align: center; }
    }
    .modal-enter, .modal-leave-active {
      opacity: 0;
    }
    .modal-enter .modal-container, .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
</style>
