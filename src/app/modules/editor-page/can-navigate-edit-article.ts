import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EditorPageComponent } from './editor-page.component';

@Injectable({
  providedIn: 'root',
})
export class CanLeaveEditGuard implements CanDeactivate<EditorPageComponent> {
  canDeactivate(
    component: EditorPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return !component.isEditing;
  }
}
