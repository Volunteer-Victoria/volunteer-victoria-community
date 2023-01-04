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

  @Column({ type: String, nullable: true })
  occursDate!: string | null;

  @Column({ type: String, nullable: true })
  occursTime!: string | null;

  @Column()
  description!: string;

  @Column()
  locationName!: string;

  @Column()
  indoorsOrOutdoors!: string;

  @Column({ type: String, nullable: true })
  contactEmail!: string | null;

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
