import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import BrowsePetitions from "./views/BrowsePetitions.vue";
import Donate from "./views/Donate.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import StartPetition from "./views/StartPetition.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import UserPage from "./views/UserPage.vue";
import AccountDetails from "./views/AccountDetails.vue";
import MyPetitions from "./views/MyPetitions.vue";
import JoinedPetitions from "./views/JoinedPetitions.vue";
import PetitionDetail from "./views/PetitionDetail.vue";
import EditPetition from "./views/EditPetition.vue"
import { useUserStore } from "./stores/UserStore";
import BrowseNewestPetitions from "./views/BrowseNewestPetitions.vue"
import BrowsePopularPetitions from "./views/BrowsePopularPetitions.vue"
import BrowseSuccededPetitions from "./views/BrowseSuccededPetitions.vue"
import ResetPassword from "./views/ResetPassword.vue"
import AdminLayout from "./views/Admin/AdminLayout.vue"
import AdminDashboard from "./views/Admin/AdminDashboard.vue"
import DonationStatus from "./views/DonationStatus.vue"
import MyDonations from "./views/MyDonations.vue"
const routes = [
    {
        path: "/",
        component: Home,
        name: "HomePage",
    },
    {
        path: "/gozat",
        component: BrowsePetitions,
        name: "BrowsePetitions",
        children:[
            {
                path:"yenikampanyalar",
                component:BrowseNewestPetitions,
                name:"BrowseNewestPetitions"
            },
            {
                path:"popularkampanyalar",
                component:BrowsePopularPetitions,
                name:"BrowsePopularPetitions"
            },
            {
                path:"basarilikampanyalar",
                component:BrowseSuccededPetitions,
                name:"BrowseSuccededPetitions"
            },

        ]
    },
    {
        path: "/kampanya/:ID",
        component: PetitionDetail,
        name: "PetitionDetail",
    },
    {
        path: "/bagis",
        component: Donate,
        name: "Donate",
    },
    {
        path:"/bagis/:status",
        component:DonationStatus,
        name:"DonationStatus"
    },
    {
        path: "/giris",
        component: Login,
        name: "Login",
    },
    {
        path: "/kayit",
        component: Register,
        name: "Register",
    },
    {
        path: "/sifremiunuttum",
        component: ForgotPassword,
        name: "ForgotPassword",
    },
    {
        path:"/sifresifirla/:token",
        component:ResetPassword,
        name:"ResetPassword"
    },
    {
        path: "/kampanyabaslat",
        component: StartPetition,
        name: "StartPetition",
    },
    {
        path: "/hesabim",
        component: UserPage,
        name: "UserPage",
        children: [
            {
                path: "hesapdetaylari",
                component: AccountDetails,
                name:"AccountDetails"
            },
            {
                path: "katildigimkampanyalar",
                component: JoinedPetitions,
                name:"JoinedPetitions"
            },
            {
                path: "baslattigimkampanyalar",
                component: MyPetitions,
                name:"MyPetitions"
            },
            {
                path:"yaptigimbagislar",
                component:MyDonations,
                name:"MyDonations"
            }
        ],
    },
    {
        path:"/kampanyaduzenle/:ID",
        component:EditPetition,
        name:"EditPetition"
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, left: 0 };
    },
});
const authNeededRoutes = ["UserPage"];
const cantEnterIfAuthorized=["Login","Register"]
router.beforeEach((to, from) => {
    console.log(to);
    const userStore = useUserStore();
    let isAuthNeeded=false
    if((authNeededRoutes.includes(to.name) || authNeededRoutes.includes(to.matched[0].name)) && !userStore.isLogged){
        isAuthNeeded=true
    }
    if(cantEnterIfAuthorized.includes(to.name) && userStore.isLogged){
        return {name:"HomePage"}
    }
    if(isAuthNeeded) return {name:"Login"}
});

export default router;
