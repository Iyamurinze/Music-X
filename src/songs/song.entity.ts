import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";

@Entity("songs")
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true, nullable: false, default: '{}' })
  artistNames: string;

  @Column({ type: "date" })
  releasedDate: Date;

  @Column({ type: "time" })
  duration: number; 

  @Column({ type: "text" })
  lyrics: string;

  @ManyToOne(() => Artist, (artist) => artist.songs, { cascade: true })
  primaryArtist: Artist; 

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
  playList: any;

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;
}
