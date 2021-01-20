
import { Column, Entity, ObjectID, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class WeatherEntity {
  
  @ObjectIdColumn()
  readonly id: ObjectID;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastTimeUpdate: Date;
}
