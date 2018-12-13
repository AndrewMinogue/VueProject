<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Select Payment Type</label>
      <select id="paymenttype" name="paymenttype" class="form-control" type="text" v-model="paymenttype">
        <option value="null" selected disabled hidden>Choose Payment Type</option>
        <option value="Direct">Direct</option>
        <option value="PayPal">PayPal</option>
        <option value="Visa">Visa</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Please Enter a deal name</label>
      <input class="form__input" id="deal" name="deal" v-model="deal"/>
    </div>
    <div class="form-group">
      <label class="form-label">Please Enter total cost of your order</label>
      <input class="form__input" id="price" name="price" v-model="price"/>
    </div>
    <div class="form-group">
      <label class="form-label">Discount Code</label>
      <input class="form__input" id="discountcode" name="discountcode" v-model="discountcode"/>
    </div>
    <div class="form-group">
      <label class="form-label">Give your order a rating</label>
      <select id="rating" name="rating" class="form-control" type="Number" v-model="rating">
        <option value="null" selected disabled hidden>Rate your order</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
    </div>
        <p>
          <button class="btn btn-primary btn1" id = 'submit' type="submit" :disabled="submitStatus === 'PENDING'">Place Order</button>
        </p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Order!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Completing Order...</p>
      </form>
        </div>
      </div>
    </div>
  </div>
</template>


    <script>
      import Vue from 'vue'
      import Vuelidate from 'vuelidate'
      import VueForm from 'vueform'
      import listpizzas from "../services/listpizzas";
      import { required, minLength, maxLength, between } from 'vuelidate/lib/validators';


      Vue.use(VueForm, {
        inputClasses: {
          valid: 'form-control-success',
          invalid: 'form-control-danger'
        }
      })

      Vue.use(Vuelidate)

      export default {
        name: 'OrderPizza',
        data () {
          return {
            messagetitle: ' Place An Order ',
            paymenttype: 'Direct',
            deal: '',
            price: 0,
            discountcode:'',
            submitStatus: null,
            rating: 0,
            pizzas: {},
          }
        },
          validations: {
            paymenttype:
              {
                required,
                minLength: minLength(4)
              },
            deal: {
              required,
              maxLength: maxLength(15)
            },
            price: {
              required,
              between:between(10,300)
            },
            discountcode: {
              required,
              maxLength: maxLength(10)
            },
            rating: {
              required,
              maxLength: maxLength(1)
            },
          },
        methods: {
          submit () {
            console.log('submit!')
            this.$v.$touch()
            if (this.$v.$invalid) {
              this.submitStatus = 'ERROR'
            } else {
              // do your submit logic here
              this.submitStatus = 'PENDING'
              setTimeout(() => {
                this.submitStatus = 'OK'
                var pizzas = {
                  paymenttype: this.paymenttype,
                  deal: this.deal,
                  price: this.price,
                  discountcode: this.discountcode,
                  rating: this.rating
                }
                this.pizzas = pizzas
                this.submitPizza(this.pizzas)
              }, 500)
            }
          },
              submitPizza: function (pizzas) {
                listpizzas.postPizza(pizzas)
                  .then(response => {
                    console.log(response)
                  })
                  .catch(error => {
                    this.errors.push(error)
                    console.log(error)
                  })
          }
        }
      }

    </script>


    <style scoped>
      .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
      }
      #app1 {
        width: 95%;
        margin: 0 auto;
      }
      .required-field > label::after {
        content: '*';
        color: red;
        margin-left: 0.25rem;
      }
      .donate-form .form-control-label.text-left{
        text-align: left;
      }

      label {
        display: inline-block;
        width: 540px;
        text-align: left;
        font-size: x-large;
      }
      .typo__p {
        width: 540px;
        font-size: x-large;
      }
      .btn1 {
        width: 300px;
        font-size: x-large;
      }
      p {
        margin-top: 20px;
      }

      input {
        border: 1px solid silver;
        border-radius: 4px;
        background: white;
        padding: 5px 10px;
        width: 540px;
      }

      .dirty {
        border-color: #5A5;
        background: #EFE;
      }

      .dirty:focus {
        outline-color: #8E8;
      }

      .error {
        border-color: red;
        background: #157ffb;
        color: whitesmoke;
      }

      .error:focus {
        outline-color: #ffa519;
      }
    </style>

