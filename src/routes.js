import Leagues from './components/Leagues.vue'
import LeagueDashboard from './components/LeagueDashboard.vue'

export const routes = [
    { path: '', component: Leagues },
    { path: '/league/:name', component: LeagueDashboard, props: true }
];