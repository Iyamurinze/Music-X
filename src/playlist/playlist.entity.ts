// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Artist } from '../user/user.entity'; // Fix: Use Artist instead of User
// import { Song } from '../songs/song.entity';

// @Entity('playlist')
// export class Playlist {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToOne(() => Artist, (artist) => artist.playlists) 
//   artist: Artist; 

//   @OneToMany(() => Song, (song) => song.playlist) 
//   songs: Song[];
// }
