export const ApiConstants ={
    USER:{
        ADD: "/user/addUser",
        FIND_ALL: "/user/findAllUsers",
        DELETE:(userId:number)=>{
            return "/user/" + userId;
        },
        UPDATE:(userId: number) => {
            return `user/update/${userId}`;
        },
        FindOne:(userId:number)=>{
            return `user/findUser/${userId}`;
        }


    },
    VISITORS:{
     FIND_ALL:"/pass/findAllvisitors",
     ADD:'/pass/addUser',
     FINDONE:(Id:number)=>{
        return `/pass/findUser/${Id}`;
     },
     Update:(Id:number)=>{
        return `/pass/editVisitor/${Id}`
     }
    
    },
    VISITORS_VISIT_DATE:{
        ADD:(Id:number)=>{
            return `/visits/${Id}`;
        },
        FINDALL:'/visits/visiting-info',
        FINDONE:(indexId:number)=>{
            return `/visits/oneVisit/${indexId}`
        },
        Update:(indexId:number,UserId:number)=>{
            return`/visits/${indexId}/${UserId}`
        },
        FINDBYBARCODE:(barcode:number)=>{
            return `/visits/barcodeNo/${barcode}`
        }
     },
     LOGInOutReports:{
        LOGOUT:(userId:number)=>{
            return `/login-logs/update/${userId}`
        },
        FINDALL:'/login-logs/findAll',

     },
    APPOINTMENT :{
        CREATE:"/vag/createAppointment",
        GET_ALL:'/vag/findAll',
        DELETE:(id:number)=>{
            return "/vag/" + id;
        }
    },
    LOGIN : "/auth/login"
    
}