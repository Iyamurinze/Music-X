import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class ArtistsJwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    return super.canActivate(context);
}
handleRequest<TUser = any>(
    err: any, 
    user: any, 
    info: any, 
    context: ExecutionContext, 
    status?: any): TUser {
    if (err || !user) { //2
        throw err || new UnauthorizedException();
      }
      console.log(user);
      if (user.artistId) {
        // 3
        return user;
            }
            throw err || new UnauthorizedException();
          }
        }        
