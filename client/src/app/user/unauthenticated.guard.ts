import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this._authService.getAuthenticatedState()
        .then(isAuthenticated => {
          if (isAuthenticated) {
            this._router.navigate(['/']);
          }

          return !isAuthenticated;
        });
    }
}

