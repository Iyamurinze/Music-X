// import { Injectable } from "@nestjs/common";
// import { Repository, In } from "typeorm";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Playlist } from "./playlist.entity";
// import { Artist, User } from "../user/user.entity";
// import { Song } from "../songs/song.entity";
// import { CreatePlaylistDto } from "./dto/create-playlist.dto";

// @Injectable()

// export class PlaylistService {
//   constructor(
//     @InjectRepository(Playlist)
//     private playlistRepository: Repository<Playlist>,

//     @InjectRepository(Artist)
//     private userRepository: Repository<Artist>,

//     @InjectRepository(Song)   
//     private songRepository: Repository<Song>,
//   ) {}

//     async create(playListDTO: CreatePlaylistDto): Promise<Playlist> {
//         const playList = new Playlist();
//         playList.name = playListDTO.name;

//         const songs = await this.songRepository.findByIds(playListDTO.songs);
//         playList.songs = songs;

//         const artist = await this.userRepository.findOneBy({ id: playListDTO.user });
//         playList.artist = artist;

//         return this.playlistRepository.save(playList);
//     }

// }