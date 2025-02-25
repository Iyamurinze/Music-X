import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UpdateSongDto } from './dto/update-song-dto';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releaseDate;

    // Ensure songDTO.artists contains valid numbers before querying
    if (songDTO.artists && songDTO.artists.length > 0) {
      const artistIds = songDTO.artists.map(id => Number(id)).filter(id => !isNaN(id)); // Convert and filter valid IDs
      song.artists = await this.artistsRepository.findByIds(artistIds);
    } else {
      song.artists = [];
    }

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  async update(id: number, recordToUpdate: UpdateSongDto): Promise<Song> {

    const song = await this.songsRepository.findOne({ where: { id } });
    console.log('updateSongDto:', recordToUpdate);
    Object.assign(song, recordToUpdate);
  
    if (recordToUpdate.artist && recordToUpdate.artist.length > 0) {
      const artistIds = recordToUpdate.artist.map(id => Number(id)).filter(id => !isNaN(id));
      console.log(artistIds);
      song.artists = await this.artistsRepository.findByIds(artistIds);
    }
  
    return this.songsRepository.save(song);
  }
  

  paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('song');
    return paginate<Song>(queryBuilder, options);
  }
}
