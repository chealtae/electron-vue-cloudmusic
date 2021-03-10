const state = {
    actived : 'recommend'
}

const getters = {
    isActived  : state => state.actived
}

const  mutations = {
    setActived(state, payload) {
        state.actived = payload
    }
}

const actions = {
    setActived ({commit}, payload){
        commit('setActived',payload)
        console.log(payload)
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}