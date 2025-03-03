import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { ArtistModule } from './artists/artists.module';
import { ArtistsController } from './artists/artists.controller';
import { dataSourceOptions } from 'db/data-source';
import { Playlist } from './playlist/playlist.entity';
import { SeedModule } from './seed/seed.module';

const devConfig = { port: 3000};
const prodConfig = { port: 4000};

@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ArtistModule,
    SeedModule,
    Playlist
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
