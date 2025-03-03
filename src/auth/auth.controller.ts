import { Body, Controller, Get, Post,Request, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import { User } from "../user/user.entity";
import { UsersService } from "../user/user.service";
import { LoginDTO } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ValidateTokenDTO } from "./dto/validate-token.dto";
import { JwtAuthGuard } from "./jwt-guard";
import { Enable2FAType } from "./types";
import { UpdateResult } from "typeorm";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private userService: UsersService, 
    private authService: AuthService) {}
  @Post("signup")
  @ApiOperation({ summary: 'Register new user' })
@ApiResponse({
status: 201,
  description: 'It will return the user in the response',
})
  signup(
@Body()
    userDTO: CreateUserDTO
  ): Promise<User> {
    console.log("Received Body:", userDTO);
    return this.userService.create(userDTO);
  }

@Post('login') login(
  @Body()
  loginDTO: LoginDTO, ){
  return this.authService.login(loginDTO);
  }  

  @Get('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(
      @Request()
        req,
        ): Promise<Enable2FAType> {
      console.log(req.user);
      return this.authService.enable2FA(req.user.userId);
}
     @Post('validate-2fa')
     @UseGuards(JwtAuthGuard)
       validate2FA(
        @Request()
         req,
         ValidateTokenDTO: ValidateTokenDTO,
         ): Promise<{ verified: boolean }> {
         return this.authService.validate2FAToken(
            req.user.userId,
             ValidateTokenDTO.token,
);
}
@Get('disable-2fa')
@UseGuards(JwtAuthGuard)
disable2FA(
@Request()
req,
): Promise<UpdateResult> {
return this.authService.disable2FA(req.user.userId);
}

@Get('profile') @UseGuards(AuthGuard('bearer')) getProfile(
  @Request()
  req,
  ){
   delete req.user.password;
   return {
    msg: 'authenticated with api key',
    user: req.user,
    };
  }
  
}
