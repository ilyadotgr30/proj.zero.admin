import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/components/pages/main/MainPage";
import UsersList from "@/components/pages/main/UsersList";
import SigninPage from  "@/components/pages/SigninPage";
import SurveysPage from "@/components/pages/main/SurveysPage";
import SurveyPage from "@/components/pages/SurveyPage";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/userslist',
        name: 'userslist',
        component: UsersList,
    },
    {
        path: '/signin',
        name: 'signin',
        component: SigninPage
    },
    {
        path: '/surveys',
        name: 'surveys',
        component: SurveysPage   
    },
    {
        path: '/surveys/:id',
        name: 'survey',
        component: SurveyPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
