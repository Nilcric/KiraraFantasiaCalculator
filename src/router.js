import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'legacy',
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
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/damage',
            name: 'Damage',
            component: () => import('./views/Damage.vue')
        },
        {
            path: '/order',
            name: 'Order',
            component: () => import('./views/Order.vue')
        },
        {
            path: '/probability',
            name: 'Probability',
            component: () => import('./views/Probability.vue')
        },
        {
            path: '/status',
            name: 'Status',
            component: () => import('./views/Status.vue')
        }
    ]
})
