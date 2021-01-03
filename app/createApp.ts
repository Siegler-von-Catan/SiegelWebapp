import Vue from "vue";
import Home from './pages/Home.vue';
import Browse from './pages/Browse.vue';
import {VueConstructor} from 'vue/types/vue';
import Merge from './pages/Merge.vue';
import 'regenerator-runtime/runtime'
import Siegel from "./pages/Siegel.vue";

const pages: {[className: string]: VueConstructor} = {
    "home": Home,
    "browse": Browse,
    "merge": Merge,
    "siegel": Siegel
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
