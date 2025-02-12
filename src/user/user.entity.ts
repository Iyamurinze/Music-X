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

    @Column()
    email: string;

    @Column()
    password: string;
}

// @Entity("artists")
// export class Artist {
//     @PrimaryGeneratedColumn()
//     id: number; 

//     @OneToOne(() => User)
//     @JoinColumn()
//     user: User;

//     @OneToMany(() => Playlist, (playlist) => playlist.artist) 
//     playlists: Playlist[];
// }
