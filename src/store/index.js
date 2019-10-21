import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import approveList from '@/store/modules/approveList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        approveList
    }
})