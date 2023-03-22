import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "opportunity" })
export class OpportunityEntity {
  @PrimaryColumn()
  opportunityId!: string;

  @Column()
  title!: string;

  @Column()
  contactName!: string;

  @Column()
  requiredPeopleCount!: number;

  @Column({ type: String })
  occursDate!: string;

  @Column({ type: String, nullable: true })
  occursTime!: string | null;

  @Column()
  description!: string;

  @Column()
  locationName!: string;

  @Column()
  isIndoors!: boolean;

  @Column()
  isOutdoors!: boolean;

  @Column()
  isOnline!: boolean;

  @Column()
  contactEmail!: string;

  @Column({ type: String, nullable: true })
  contactPhone!: string | null;

  @Column()
  criminalRecordCheckRequired!: boolean;

  @Column({ type: String, nullable: true })
  idealVolunteer!: string | null;

  @Column({ type: String, nullable: true })
  additionalInformation!: string | null;

  @Column()
  postedTime!: number;

  @Column()
  postedByUserId!: string;
}
