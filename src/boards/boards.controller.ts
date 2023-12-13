import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
// import { title } from 'process';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }
// //private를 사용하는 이유는 프로퍼티 자체를 class 자체에서만 사용하기 위해

// @Get('/')
//     getAllBoard(): Board[] {
//     return this.boardsService.getAllBoards(); 
//     }

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }


// @Post()
// @UsePipes(ValidationPipe)
// createBoard(
//     @Body() createBoardDto: CreateBoardDto
//     ) : Board {
//         return this.boardsService.createBoard(createBoardDto)
// }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }


    @Get(':/id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id)
    }


// @Get('/:id')
// // ex) localhost:5000?id=123454539
//     getBoardById(@Param('id') id: string): Board {
//         return this.boardsService.getBoardById(id)
//     }

@Delete('/:id')
deleteBoard(@Param('id', ParseIntPipe) id): Promise<void>{
    return this.boardsService.deleteBoard(id)
}

// @Delete('/:id')
//     deleteBoard(@Param('id') id: string): void {
//         this.boardsService.deleteBoard(id);
//     }


@Patch('/:id/status')
updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus){
        return this.boardsService.updateBoardStatus(id, status);
    }


// @Patch('/:id/status')
// updateBoardStatus(
//     @Param('id') id: string,
//     @Body('status', BoardStatusValidationPipe) status: BoardStatus
// ){
//     return this.boardsService.updateBoardStatus(id, status);
// }

} 
