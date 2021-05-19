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
import {VueConstructor} from 'vue/types/vue';
import SiegelView from "./pages/SiegelView.vue";
import Browse from './pages/Browse.vue';
import Guide from './pages/Guide.vue';
import Home from './pages/Home.vue';
import 'regenerator-runtime/runtime'

const pages: {[className: string]: VueConstructor} = {
    "siegel": SiegelView,
    "home": Home,
    "browse": Browse,
    "guide": Guide,
};

const appElem = document.getElementById("app");
if (appElem == null) throw Error();

let rendered = false;
for (const page of Object.keys(pages)) {
    if (appElem.classList.contains(page)) {
        rendered = true;
        new Vue({render: createElement => createElement(pages[page])}).$mount("#app");
        break;
    }
}

if (!rendered) {
    console.error("No page class has been set on #app element")
}
