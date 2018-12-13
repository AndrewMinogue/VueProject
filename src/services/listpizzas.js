import Api from '@/services/api'

export default {
  fetchPizzas () {
    return Api().get('/pizzas')
  },
  postPizza (pizzas) {
    return Api().post('/pizzas', pizzas,{ headers: {'Content-type': 'application/json'} })
  },
  upvoteOrder (id) {
    return Api().put(`/pizzas/${id}/rating`)
  },
  deleteOrder (id) {
    return Api().delete(`/pizzas/${id}`)
  }

}
