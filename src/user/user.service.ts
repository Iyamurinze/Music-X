// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "./user.entity";
// import * as bcrypt from "bcryptjs";
// import { CreateUserDTO } from "./dto/create-user.dto";

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User> 
//   ) {}

//   async create(userDTO: CreateUserDTO): Promise<User> {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(userDTO.password, salt);

//     const user = this.userRepository.create({
//       ...userDTO,
//       password: hashedPassword, // Save hashed password
//     });

//     const savedUser = await this.userRepository.save(user); // Save the user in the database

//     delete savedUser.password; // Remove password before returning

//     return savedUser;
//   }
// }
