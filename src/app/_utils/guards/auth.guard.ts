import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  lastURL = "";
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (sessionStorage.getItem('currentUser')) {
      //Si existe el usuario en sesion, devuelve true

      if (next.routeConfig.path == "listado/:id") {

        if (this.lastURL != '/listado/' + next.params.id) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/listado/' + next.params.id]));
          this.lastURL = '/listado/' + next.params.id;
        }
      }
      console.log(next );
      next.routeConfig.path 
      return true;

    }
    else{
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;

    }

    console.log(next );

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
