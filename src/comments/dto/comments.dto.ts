import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CommentsDto {
    @ApiProperty({
        description: 'Текст комментария',
        example: 'Здравствуйте, меня зовут Кирилл',
    })
    @IsString({ message: 'Описание должно быть строкой' })
    @IsNotEmpty()
    readonly text: string
}