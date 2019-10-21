import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/login';
import MainLayout from '@/layout/mainLayout'
import ApproveList from '@/pages/approveList'

Vue.use(VueRouter);
const createRouter = () => new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (!to.meta.savePos) {
                return {x: 0, y: 0}
            }
        }
    },
    routes: [
        {
            path: '/',
            component:MainLayout,
            children:[
                {
                    path:'',
                    redirect:'approveList'
                },
                {
                    path:'approveList',
                    component:ApproveList
                }
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '*',
            redirect:'/'
        }
    ]
});
const router = createRouter();
export default router