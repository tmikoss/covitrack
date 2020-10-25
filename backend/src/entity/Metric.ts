import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Area } from './Area'

@Entity()
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  activeCases!: number

  @Column()
  totalCases!: number

  @Column()
  totalDeaths!: number

  @Column()
  totalRecovered!: number

  @Column()
  date!: Date

  @ManyToOne(() => Area, area => area.metrics)
  area!: Area;
}


// { "Active Cases_text": "10,148,242",
//  "Country_text": "World",
//   "Last Update": "2020-10-25 12:04",
//   "New Cases_text": "+110,001",
//   "New Deaths_text": "+1,702",
//   "Total Cases_text": "43,028,260",
//   "Total Deaths_text": "1,156,014",
//   "Total Recovered_text": "31,724,004" }
