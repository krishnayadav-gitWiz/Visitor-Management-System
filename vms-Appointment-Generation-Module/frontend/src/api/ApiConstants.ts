export const ApiConstants ={
    LOGInOutReports:{
        LOGOUT:(userId:number)=>{
            return `/login-logs/update/${userId}`
        }
     },
     USER:{
     UPDATE:(userId: number) => {
        return `user/update/${userId}`;
    }},
    APPOINTMENT :{
        CREATE:"/vag/createAppointment",
        GET_ALL:'/vag/findAll',
        DELETE:(id:number)=>{
            return "/vag/" + id;
        }
    },
    LOGIN : "/auth/login"
    
}