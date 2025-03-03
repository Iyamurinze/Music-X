import { Module } from "@nestjs/common";
import { PlayListsController } from './playlist.controller';
import { PlayListsService } from "./playlist.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { User } from "../user/user.entity";
import { Song } from "../songs/song.entity";
import { UsersModule } from '../user/user.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User, Song]), UsersModule],
  controllers: [PlayListsController],
  providers: [PlayListsService],
})
export class PlaylistModule {}