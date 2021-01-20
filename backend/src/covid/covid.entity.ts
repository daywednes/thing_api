import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity("Covid")
@Unique(['isoCode'])
export class CovidEntity extends BaseEntity {
  @ObjectIdColumn()
  readonly id: ObjectID;
  @Column()
  isoCode: number;
  @Column()
  countryOrRegion: string;
  @Column()
  cityLat: string;
  @Column()
  cityLon: string;
  @Column()
  country: string;
  @Column()
  totalConfirmedCases: number;
  @Column()
  newlyConfirmedCases: number;
  @Column()
  totalDeaths: number;
  @Column()
  newDeaths: number;
  @Column()
  totalRecoveredCases: number;
  @Column()
  newlyRecoveredCases: number;
  @Column()
  syncDateTime: string;
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date;
}
