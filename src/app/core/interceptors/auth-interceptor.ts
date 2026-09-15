import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const apiUrl ='https://jubgrjvqbnbkbbvuujrs.supabase.co'
  const apiKey = 'sb_publishable_3Lc-xH5h-g1Z9xrCQkRXwQ_QUJ1IQkn'
  const apiReq = `${apiUrl}${req.url}`
  const access_token = localStorage.getItem('access_token')

  if(access_token){
  const request = req.clone({
    url:apiReq ,
    setHeaders : {
      Authorization :  `Bearer ${access_token}` ,
      'Content-Type': 'application/json',
      'apikey': apiKey
    }
  })
   return next(request);
  }
  const request = req.clone({
    url:apiReq ,
    setHeaders : {
      'Content-Type': 'application/json',
      'apikey': apiKey
    }
  })
  return next(request);
};
