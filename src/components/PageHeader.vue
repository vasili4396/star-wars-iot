<template>
  <header class="header">
    <div class="header__container">
      <div
        class="row"
        style="height: 60px; position: fixed; margin-left: 10%;">
        <router-link :to="'/purchases'">
          <div class="header__logo"/>
        </router-link>
        <h1 class="header__text">{{ pageName }}</h1>
        <div
          v-if="$route.path !== '/billing'"
          class="shopping-cart-icon center-container"
          @click="goToBilling">
          <div class="mr-2 total-cost-color">{{ totalCost }}</div>
          <div class="col-align-center">
            <span :class="{'total-count-margin': itemsInShoppingCart === 0}">
              {{ itemsInShoppingCart || '' }}
            </span>
            <i class="material-icons ">
              shopping_cart
            </i>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters([
      'pageName',
      'itemsInShoppingCart',
      'totalCost'
    ])
  },
  methods: {
    goToBilling () {
      this.$router.push('/billing')
    }
  }
}
</script>

<style lang="scss" scoped>
  .shopping-cart-icon {
    position: fixed;
    right: 15%;
    margin-top: 5px;
    cursor: pointer;
    width: 120px;
    i { font-size: 30px; }
    span { color: whitesmoke }
    &:hover {
      span, i, div {
        color: $primary-hover-color;
      }
    }
  }
  .total-cost-color {
    color: $primary-color;
  }
  .total-count-margin {
    margin-top: 15px;
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    min-width: 100%;
    background: #000;
    z-index: 9900;

    div {
      overflow: hidden;
    }

    &__container {
      width: 1200px;
      padding: 10px;
      height: 80px;
      box-sizing: border-box;
    }

    &__logo {
      width: 110px;
      height: 55px;
      margin-right: 200px;
      background: url("./../assets/logo.png") (0% / contain) no-repeat;
    }

    &__text {
      color: white;
      text-align: center;
      margin-top: 10px;
      font-size: 32px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1.2px;
    }
  }
</style>
