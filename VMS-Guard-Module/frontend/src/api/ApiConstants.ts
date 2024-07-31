export const ApiConstants ={
   
    VISITORS:{
     FIND_ALL:"/pass/findAllvisitors"
    
    },
    VISITORS_VISIT_DATE:{
        FINDALL:'/visits/visiting-info',  
     },
    
   BARCODESCAN:(barcode:number)=>{ return `/visits/barcodeNo/${barcode}`},
    LOGIN : "/auth/login"
    
}