import Vue from "vue";
import {VueConstructor} from 'vue/types/vue';
import SiegelView from "./pages/SiegelView.vue";
import Browse from './pages/Browse.vue';
import Home from './pages/Home.vue';
import 'regenerator-runtime/runtime'

const pages: {[className: string]: VueConstructor} = {
    "siegel": SiegelView,
    "home": Home,
    "browse": Browse,
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
