import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: "dashboard",
            component: () =>
                import ("@/view/layout/Layout"),
            children: [{
                path: "/dashboard",
                name: "dashboard",
                component: () =>
                    import ("@/view/pages/Dashboard.vue"),
            }, {
                path: "/my-products",
                name: "my-products",
                component: () =>
                    import ("@/view/pages/My-products.vue")
            }],
        },

        {
            path: "*",
            redirect: "/404",
        },
        {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () =>
                import ("@/view/pages/error/Error.vue"),
        },
    ],
});