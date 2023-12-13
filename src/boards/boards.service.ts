import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private BoardRepository: BoardRepository
    ){}
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const { title, description } = createBoardDto;    //const title = createBoardDto.title;
    //     const board: Board ={
    //         id: uuid(),
    //         title, // = title: title
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }


    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.BoardRepository.createBoard(createBoardDto);
    }


    async getBoardById(id: number) : Promise <Board> {
        const found = await this.BoardRepository.findOne({ where: { id } });

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }   
    
    
    
    
    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
        
    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${id}`)
    //     }
    //         return found
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.BoardRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }


    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board; 
    // }


}
