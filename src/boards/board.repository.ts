import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{

}