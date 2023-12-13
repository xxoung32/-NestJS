import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model'
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //private를 사용하지 않으면 다른 컴포넌트에서 board라는 배열 값을 수정할 수 있음


    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const { title, description } = createBoardDto;    //const title = createBoardDto.title;
        const board: Board ={
            id: uuid(),
            title, // = title: title
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
            return found
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board; 
    }


}
