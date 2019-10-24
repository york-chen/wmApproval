import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/store/modules/login'
import approveList from '@/store/modules/approveList'
import common from '@/store/modules/common'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        approveList,
        common
    }
})