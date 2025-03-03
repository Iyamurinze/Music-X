//db/data-source.ts
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
username: "postgres",
password: "jeremie",
database: "Spotify-clone",
entities: ["dist/**/*.entity.js"], //1 
synchronize: true, // 2
migrations: ["dist/db/migrations/*.js"], // 3 
};
const dataSource = new DataSource(dataSourceOptions); //4
 export default dataSource;
