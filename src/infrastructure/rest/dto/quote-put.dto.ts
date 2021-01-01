import { IsString, IsNotEmpty } from "class-validator";

export class QuotePutBodyDto {
    @IsString()
    @IsNotEmpty()
    readonly text: string;
}