import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/UserStore";
const routes = [
    {
        path: "/",
        component: ()=> import("./views/Home.vue"),
        name: "HomePage",
    },
    {
        path: "/gozat",
        component: ()=>import("./views/BrowsePetitions.vue"),
        name: "BrowsePetitions",
        children:[
            {
                path:"yenikampanyalar",
                component:()=>import("./views/BrowseNewestPetitions.vue"),
                name:"BrowseNewestPetitions"
            },
            {
                path:"popularkampanyalar",
                component:()=>import("./views/BrowsePopularPetitions.vue"),
                name:"BrowsePopularPetitions"
            },
            {
                path:"basarilikampanyalar",
                component:()=>import("./views/BrowseSuccededPetitions.vue"),
                name:"BrowseSuccededPetitions"
            },

        ]
    },
    {
        path: "/kampanya/:ID",
        component: ()=> import("./views/PetitionDetail.vue"),
        name: "PetitionDetail",
    },
    {
        path: "/bagis",
        component: ()=>import("./views/Donate.vue"),
        name: "Donate",
    },
    {
        path:"/bagis/:status",
        component:()=>import("./views/DonationStatus.vue"),
        name:"DonationStatus"
    },
    {
        path: "/giris",
        component: ()=>import("./views/Login.vue"),
        name: "Login",
    },
    {
        path: "/kayit",
        component: ()=>import("./views/Register.vue"),
        name: "Register",
    },
    {
        path: "/sifremiunuttum",
        component: ()=>import("./views/ForgotPassword.vue"),
        name: "ForgotPassword",
    },
    {
        path:"/sifresifirla/:token",
        component:()=>import("./views/ResetPassword.vue"),
        name:"ResetPassword"
    },
    {
        path: "/kampanyabaslat",
        component: ()=>import("./views/StartPetition.vue"),
        name: "StartPetition",
    },
    {
        path: "/hesabim",
        component: ()=>import("./views/UserPage.vue"),
        name: "UserPage",
        children: [
            {
                path: "hesapdetaylari",
                component: ()=>import("./views/AccountDetails.vue"),
                name:"AccountDetails"
            },
            {
                path: "katildigimkampanyalar",
                component: ()=>import("./views/JoinedPetitions.vue"),
                name:"JoinedPetitions"
            },
            {
                path: "baslattigimkampanyalar",
                component: ()=>import("./views/MyPetitions.vue"),
                name:"MyPetitions"
            },
            {
                path:"yaptigimbagislar",
                component:()=>import("./views/MyDonations.vue"),
                name:"MyDonations"
            }
        ],
    },
    {
        path:"/kampanyaduzenle/:ID",
        component:()=>import("./views/EditPetition.vue"),
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
