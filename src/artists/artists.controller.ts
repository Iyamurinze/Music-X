import { Controller, Get } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
    @Get()
    getAllArtists() {
      return { message: 'Fetching all artists' };
    }
  }

