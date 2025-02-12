export const connection: Connection = {
  CONNECTION_STRING: 'MYSQL/LOCALHOST',
  DB: 'MYSQL',
  DBNAME: 'TEST',
};

export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
}