import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { DataService } from './data.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  test:any;
  constructor(private dataService: DataService) { }
  intercept(req, next){
    //let token = this.dataService.getToken().pipe(map((res: Response) => res.json()))
  //console.log(token);
    let token = localStorage.getItem('token');
    let tokenziedReq = req.clone({
      setHeaders:{
        Authorization :`Bearer ${token}`
      }
    })
    return next.handle(tokenziedReq)
  }
}
