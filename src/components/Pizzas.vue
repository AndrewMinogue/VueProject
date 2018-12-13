<template>
  <div id="app1">
    <v-client-table :columns="columns" :data="pizzas" :options="options">
      <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x VueTables__sortable"  @click="upvote(props.row._id)"></a>
      <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x VueTables__sortable" @click="deleteOrder(props.row._id)"></a>
    </v-client-table>
  </div>
</template>

<script>

  import listpizzas from '@/services/listpizzas'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

  export default {
    name: 'Pizzas',
    data () {
      return {
        messagetitle: ' List of Pizzas ',
        pizzas: [{"paymenttype" : String , "deal" : String , "price" : Number , "discountcode" : String ,  "rating": Number }],
        errors: [],
        props: ['_id'],
        columns: ['_id', 'paymenttype', 'deal', 'price','discountcode','rating','upvote','remove'],
        options: {
          sortable: ['upvotes'],
          perPage: 10,
          headings: {
            _id: 'ID',
            paymenttype: 'Payment Type',
            price: 'Price',
            discountcode: 'Discount Code',
            rating: 'Rating',
          }
        }
      }
    },

    created () {
      this.loadPizzas()
    },
    methods: {
      loadPizzas: function () {
        listpizzas.fetchPizzas()
          .then(response => {
            this.pizzas = response.data
            console.log(this.pizzas)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      upvote: function (id) {
        listpizzas.upvoteOrder(id)
          .then(response => {

            console.log(response)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      },
      deleteOrder: function (id) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value)
          if (result.value === true) {
            listpizzas.deleteOrder(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data
                console.log(this.message)
                this.loadPizzas()
                 Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'Poof! Order Deleted ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error)
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'Your Pizza lives another day!', 'info')
          }
        })
      }
    }
  }
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }

  .VueTables__sortable {
    cursor: pointer;
  }
</style>
