import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../user/auth.service';

@Injectable()
export class AdminAuthenticatedGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this._authService.getAuthenticatedState()
        .then(isAuthenticated => {
          if (!isAuthenticated || !this._authService.isAdmin) {
            this._router.navigate(['/']);
          }

          return this._authService.isAdmin;
        });
    }
}
