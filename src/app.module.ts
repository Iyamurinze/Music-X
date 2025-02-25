import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './songs/song.entity';
import { DataSource } from 'typeorm';
import { Artist } from './artists/artist.entity';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artists/artists.module';
import { ArtistsService } from './artists/artists.service';
import { ArtistsController } from './artists/artists.controller';

const devConfig = { port: 3000};
const prodConfig = { port: 4000};

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'jeremie',
    database: 'Spotify',
    entities: [Song, Artist, User],
    synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ArtistModule,
  ],
  controllers: [AppController, ArtistsController],
  providers: [AppService, 
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG', 
      useFactory: () =>{
       return process.env.NODE_ENV === 'development' ? devConfig : prodConfig
      },
    },
  ],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {
    console.log('DB Name:', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {}
}
