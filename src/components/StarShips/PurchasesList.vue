<template>
  <div>
    <section class="content__section border-bottom py-3">
      <div
        v-if="numberOfPages.length"
        class="row row__justify-center mb-3">
        <i
          class="arrow-btn material-icons btn btn_circle btn_primary mr-2"
          @click="decreasePointer"
        >keyboard_arrow_left</i>
        <div
          v-for="(pageNumber, i) in numberOfPages.slice(pageSlice, pageSlice + starshipsPerPage)"
          :class="{currently__selected: pointer + 1 === pageNumber}"
          :key="i"
          class="mr-2 center-container page-number"
          @click="setPage(pageNumber)"
        >
          {{ pageNumber }}
        </div>
        <i
          class="arrow-btn material-icons btn btn_circle btn_primary"
          @click="increasePointer"
        >keyboard_arrow_right</i>
      </div>
    </section>
    <section
      class="content__section"
      style="min-height: 1000px">
      <load-process :is-loading="isDataLoading"/>
      <div
        v-for="(starship, starshipIndex) in availableStarships"
        :key="starshipIndex"
        class="py-3"
      >
        <div class="row row__justify-sb">
          <div class="row center-container">
            <h2 class="mr-2">{{ starship.name }}</h2>
            <i
              class="material-icons"
              @click="showDetails(starshipIndex)">
              arrow_drop_down
            </i>
          </div>
          <div class="row center-container">
            <span class="mr-2">Цена: {{ starship.cost }}</span>
            <div v-if="!isInShoppingCart(starship)">
              <i
                class="material-icons"
                @click="addStarShip(starship)">
                add_shopping_cart
              </i>
            </div>
            <div v-else>
              <i
                class="material-icons"
                @click="removeStarShip(starship)">
                delete
              </i>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <span class="tip">
            Модель: {{ starship.model }}
          </span>
        </div>
        <div
          v-show="starship.showDetails"
          class="details">
          <div>Класс космолета: {{ starship.starship_class }}</div>
          <div>Переносимый вес: {{ starship.cargo_capacity }}</div>
          <div>Длина: {{ starship.length }}</div>
          <div>Произведен: {{ starship.created ? starship.created.slice(0, 10) : 'Нет данных' }}</div>
          <div>Производитель: {{ starship.manufacturer }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoadProcess from '../ModalComponents/LoadProcess'
export default {
  name: 'PurchasesList',
  components: {
    LoadProcess
  },
  data () {
    return {
      availableStarships: [],
      isDataLoading: true,
      pointer: 0,
      pageSlice: 0,
      starshipsPerPage: 10,
      numberOfPages: 1
    }
  },
  computed: {
    ...mapGetters([
      'isInShoppingCart'
    ])
  },
  mounted () {
    this.setPageName('Список космолетов')
    this.loadRecords()
  },
  methods: {
    loadRecords () {
      this.isDataLoading = true
      this.getStarShips({
        page: this.pointer + 1
      })
        .then(response => {
          this.availableStarships = response.results
          this.availableStarships.forEach(starship => {
            this.$set(starship, 'cost', this.setRandomCost())
            this.$set(starship, 'showDetails', false)
            this.$set(starship, 'addedToCart', false)
          })
          this.numberOfPages = Array.from(new Array(Math.ceil(response.count / this.starshipsPerPage)), (val, index) => index + 1)
          this.isDataLoading = false
        })
    },
    setRandomCost () {
      let minValue = 1000
      let maxValue = 10000
      return (Math.random() * (maxValue - minValue) + minValue).toFixed(2)
    },
    showDetails (starshipIndex) {
      this.availableStarships[starshipIndex].showDetails = !this.availableStarships[starshipIndex].showDetails
    },
    addStarShip (starship) {
      starship.addedToCart = true
      this.addToShoppingCart(starship)
    },
    removeStarShip (starship) {
      if (this.isInShoppingCart(starship)) this.removeFromShoppingCart(starship)
    },
    setPage (pageNumber) {
      this.pointer = pageNumber - 1
      this.loadRecords()
    },
    decreasePointer () {
      let oldValue = this.pointer
      if (oldValue > 0) {
        this.pointer = oldValue - 1
        if (Math.floor(oldValue / this.starshipsPerPage) !== Math.floor(this.pointer / this.starshipsPerPage)) {
          this.pageSlice = this.pageSlice - this.starshipsPerPage
        }
      }
      this.loadRecords()
    },
    increasePointer () {
      let oldValue = this.pointer
      if (oldValue + 1 < this.numberOfPages.length) {
        this.pointer = oldValue + 1
        if (Math.floor(oldValue / this.starshipsPerPage) !== Math.floor(this.pointer / this.starshipsPerPage)) {
          this.pageSlice = this.pageSlice + this.starshipsPerPage
        }
      }
      this.loadRecords()
    },
    ...mapActions([
      'setPageName',
      'getStarShips',
      'addToShoppingCart',
      'removeFromShoppingCart'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .details {
    div {
      margin-bottom: 6px;
    }
  }
  .page-number {
    cursor: pointer;
    justify-content: center;
    width: 25px;
    height: 25px;
    color: #959595;
  }
  .currently__selected {
    border-radius: 50%;
    color: #ffffff;
    background: #959595;
  }
  .arrow-btn {
    font-size: 20px;
    padding: 0;
    width: 25px;
    height: 25px;
    line-height: 1.17;
    text-align: center;
    vertical-align: middle;
  }
</style>
