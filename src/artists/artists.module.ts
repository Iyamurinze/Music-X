import{Module} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService],
  controllers: [ArtistsController],
  exports: [ArtistsService]
})
export class ArtistModule{}