import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/damage',
            name: 'Damage',
            component: () => import('./components/Damage.vue')
        },
        {
            path: '/random',
            name: 'Random',
            component: () => import('./components/Random.vue')
        },
        {
            path: '/order',
            name: 'Order',
            component: () => import('./components/Order.vue')
        },
        {
            path: '/status',
            name: 'Status',
            component: () => import('./components/Status.vue')
        }
    ]
})
