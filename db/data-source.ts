//db/data-source.ts
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: "postgres",
      host: configService.get<string>("dbHost"),
      port: configService.get<number>("dbPort"),
      username: configService.get<string>("username"),
      database: configService.get<string>("dbName"),
      password: configService.get<string>("password"),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ["dist/db/migrations/*.js"],
}; },
};

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
entities: ["dist/**/*.entity.js"], //1 
synchronize: false, // 2
migrations: ["dist/db/migrations/*.js"], // 3 
};
const dataSource = new DataSource(dataSourceOptions); //4
 export default dataSource;
