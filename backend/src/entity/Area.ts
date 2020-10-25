import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Metric } from './Metric'

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @OneToMany(() => Metric, metric => metric.area)
  metrics!: Metric[]
}
