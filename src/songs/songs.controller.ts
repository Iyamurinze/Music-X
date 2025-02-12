import { Controller, Delete, Put, Get, Post, Body, HttpException, Param, HttpStatus, ParseIntPipe, Inject, Scope, Query, DefaultValuePipe  } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService,) {
    // console.log('SongsService:', this.songsService);
    // console.log('SongsService instance type:', this.songsService instanceof SongsService);
    // console.log('SongsService has create method:', typeof this.songsService.create);
  }

  @Post()
   create(@Body() createSongDto: CreateSongDto): Promise<Song> { 
    return this.songsService.create(createSongDto); 
  }

  @Get()
  findAll( @Query('page', new DefaultValuePipe(1), ParseIntPipe)
  page: number = 1,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
  limit: number = 10,
): Promise < Pagination < Song >> {
  limit = limit > 100 ? 100 : limit;
  return this.songsService.paginate({
page,
limit, });
}


  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ 
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
    })) id: number
  ): Promise<Song>{
    return this.songsService.findOne(id);
  }

  @Put(':id')
async update(@Param('id') id: number, @Body() updateSongDto: UpdateSongDto): Promise<Song> { 
  return this.songsService.update(id, updateSongDto);
}


  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
