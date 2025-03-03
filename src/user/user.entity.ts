import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Playlist } from "../playlist/playlist.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;
    
    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;

    @Column({ nullable: true })
    apiKey: string;
}

// @Entity("artists")
// export class Artist {
//     @PrimaryGeneratedColumn()
//     id: number; 

//     @OneToOne(() => User)
//     @JoinColumn()
//     user: User;

    // @OneToMany(() => Playlist, (playlist) => playlist.user) 
    // playlists: Playlist[];
// }
