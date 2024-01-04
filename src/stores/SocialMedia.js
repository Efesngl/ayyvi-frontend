import {defineStore} from "pinia"

export const useSocialStore=defineStore("socialStore",{
    state:()=>({
        socials:[]
    }),
    persist:true,
    getters:{
        isSocialsSet:(state)=>{
            if(state.socials.length>0){
                return true
            }
            return false
        }
    },
    actions:{}
})