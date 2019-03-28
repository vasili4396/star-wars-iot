<template>
  <div>
    <section class="content__section">
      <div class="py-3">
        <div class="row row__justify-sb">
          <div class="center-container">
            <h3>
              В корзине {{ itemsInShoppingCart }} товаров на общую сумму: {{ totalCost }}
            </h3>
          </div>
          <div
            class="btn btn_primary"
            @click="isCheckoutModalOpen = true">
            Оформить заказ
          </div>
        </div>
      </div>
    </section>
    <section class="content__section">
      <div
        v-for="(item, itemIndex) in shoppingCart"
        :key="itemIndex"
        class="py-3"
      >
        <div class="row row__justify-sb">
          <h2 class="mr-2">{{ item.name }}</h2>
          <div class="row center-container">
            <span class="mr-2">Цена: {{ item.cost }}</span>
            <i
              class="material-icons"
              @click="removeStarShip(item)">
              delete
            </i>
          </div>
        </div>
        <div class="mb-3">
          <span class="tip">
            Модель: {{ item.model }}
          </span>
        </div>
      </div>
    </section>
    <modal-window
      v-if="isCheckoutModalOpen"
      menu="checkout"
      @checkout-complete="checkout"
      @close="isCheckoutModalOpen = false"
    >
      <div slot="body">
        <input
          placeholder="Введите ФИО"
          style="width: 350px"
          type="text"
          class="form-control mb-2"
        >
        <input
          placeholder="Введите адрес доставки"
          style="width: 350px"
          type="text"
          class="form-control mb-2"
        >
        <div class="row">
          <div class="center-container mr-2">
            <span class="tip">Введите дату доставки</span>
          </div>
          <input
            type="text"
            class="time-input"
            placeholder="01.01.1970"
            @input="updateValue"
          >
        </div>
      </div>
    </modal-window>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalWindow from '../ModalComponents/ModalWindow'
export default {
  name: 'Billing',
  components: {
    ModalWindow
  },
  data () {
    return {
      isCheckoutModalOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'shoppingCart',
      'itemsInShoppingCart',
      'totalCost'
    ])
  },
  mounted () {
    this.setPageName('Корзина')
  },
  methods: {
    removeStarShip (starship) {
      this.removeFromShoppingCart(starship)
    },
    checkout () {
      this.clearShoppingCart()
      this.isCheckoutModalOpen = false
      this.$router.push('/')
    },
    updateValue (e) {
      let str = e.currentTarget.value
      let val = ''
      for (let i = 0; i < str.length; i++) {
        if ((i === 2 && str[i] !== '.') || (i === 5 && str[i] !== '.')) val += '.'
        if (i < 10) val += str[i]
      }
      e.currentTarget.value = val
    },
    ...mapActions([
      'setPageName',
      'removeFromShoppingCart',
      'clearShoppingCart'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .time-input {
    display: inline-block;
    position: relative;
    font-weight: 400;
    text-align: center;
    padding: .488rem 5px;
    font-size: 15px;
    line-height: 1.5;
    border-radius: $button-border-radius;
    cursor: pointer;
    transition: 0.5s;
    background: #e5e5e5;
    color: $font-color;
    border: 1px solid #cdcdcd;
  }
</style>
