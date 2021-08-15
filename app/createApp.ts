/*
 * ShapeFromShading - Creating heightmaps out of 2D seal images.
 * Copyright (C) 2021
 * Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from "vue";
import 'regenerator-runtime/runtime'
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import Page from './pages/Page.vue';
import Browse from './pages/Browse.vue';
import SiegelView from './pages/SiegelView.vue';
import Remix from './pages/Remix.vue';
import Guide from './pages/Guide.vue';

Vue.use(VueRouter);

const routes = [
    { path: "/home", component: Home },
    { path: "/", redirect: "/home" },
    { path: "/browse", component: Browse },
    // { path: "/create", component: Create },
    { path: "/guide", component: Guide },
    { path: "/detail", component: SiegelView },
    { path: "/remix", component: Remix }
];

const router = new VueRouter({
    mode: "history",
    routes
});

new Vue({
    el: "#app",
    router,
    render: (h) => h(Page)
});
