import { Body, Controller, Post } from "@nestjs/common";
import { Playlist } from "./playlist.entity";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { PlayListsService } from "./playlist.service";

@Controller("playlists")
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
@Body()
    playlistDTO: CreatePlaylistDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
