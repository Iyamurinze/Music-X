import { Module, NestModule, MiddlewareConsumer, Controller, Get } from '@nestjs/common';
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
import { typeOrmAsyncConfig } from 'db/data-source';
import { Playlist } from './playlist/playlist.entity';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from '../env.validation';

const devConfig = { port: 3000};
const prodConfig = { port: 4000};

@Module({
  imports: [
    SongsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [configuration],
      validate: validate
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
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