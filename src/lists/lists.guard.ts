import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class ListsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const urlUserId = req.params.userId;
    const guardUserId = req.user.id;

    return urlUserId === guardUserId;
  }
}