import '@/assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import directives from './directives';

const app = createApp(App);

directives.forEach(({ name, directive }) => {
  app.directive(name, directive);
});

app.use(createPinia());
app.use(router);

app.mount('#app');
