import { IsArray, IsDateString, IsMilitaryTime, IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateSongDto{
    @IsString()
    @IsOptional()
    readonly title;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artist;

    @IsDateString()
    @IsOptional()
    readonly releasedDate: Date;
s
    @IsOptional()
    @IsMilitaryTime()
    readonly duration: number;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}