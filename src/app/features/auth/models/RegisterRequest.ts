export interface RegisterReqApi {
   email: string;
   password: string;
   data: RegisterData ;
  
}
export interface RegisterRequest {
   email: string;
   password: string;
   data: RegisterData ;
   confirmPassword : string
}


  export interface RegisterData {
     name: string;
    job_title: string;
  }


