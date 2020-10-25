import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
