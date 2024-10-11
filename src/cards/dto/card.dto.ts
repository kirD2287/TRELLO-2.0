import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CardDto {
    @ApiProperty({ example: 'Карточка 1', description: 'Имя карточки' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string
}