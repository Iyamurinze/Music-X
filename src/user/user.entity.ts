import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Playlist } from "../playlist/playlist.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
      example: "Jane",
      description: "Provide the first name of the user",
    })

    @Column()
    firstName: string;

    @ApiProperty({
      example: "Doe",
      description: "provide the lastName of the user",
    })

    @Column()
    lastName: string;

    @ApiProperty({
      example: "jane_doe@gmail.com",
      description: "Provide the email of the user",
    })

    @Column({unique: true})
    email: string;

    @ApiProperty({
      description: "Provide the password of the user",
    })

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;
    
    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    @Column({ nullable: true })
    apiKey: string;
  playLists: any;
    
}

@Entity("artists")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number; 

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Playlist, (playlist) => playlist.user) 
    playlists: Playlist[];
}
