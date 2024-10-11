import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ColumnDto {
    @ApiProperty({ example: 'Колонка 1', description: 'Имя колонки' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string
}