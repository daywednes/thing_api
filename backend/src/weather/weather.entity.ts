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
@Entity("Weather")
@Unique(['zipCode'])
export class WeatherEntity extends BaseEntity {
  @ObjectIdColumn()
  readonly id: ObjectID;
  @Column()
  zipCode: number;
  @Column()
  cityName: string;
  @Column()
  cityLat: string;
  @Column()
  cityLon: string;
  @Column()
  country: string;
  @Column()
  date: string;
  @Column()
  listWeathers: [Object];
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt?: Date;
}
