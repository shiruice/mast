const shoppingCart={
    state: {
        count:0,
    },
    mutations: {
        increment(state,params){
            state.count++
        },
        decrease(state){
            state.count--;
        }
    }
}

export default shoppingCart;