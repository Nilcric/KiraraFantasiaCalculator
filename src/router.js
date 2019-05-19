import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    // eslint-disable-next-line
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                offset: {
                    x: 0,
                    y: 64,
                }
            }
        } else {
            return {
                x: 0,
                y: 0,
            }
        }
    },
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/Home.vue')
        },
        {
            path: '/damage',
            name: 'Damage',
            component: () => import('./components/Damage.vue')
        },
        {
            path: '/order',
            name: 'Order',
            component: () => import('./components/Order.vue')
        },
        {
            path: '/probability',
            name: 'Probability',
            component: () => import('./components/Probability.vue')
        },
        {
            path: '/status',
            name: 'Status',
            component: () => import('./components/Status.vue')
        }
    ]
})
