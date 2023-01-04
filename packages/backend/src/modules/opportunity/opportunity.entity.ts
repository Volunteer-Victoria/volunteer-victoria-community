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

  @Column({ type: "char", nullable: true })
  occursDate!: string | null;

  @Column({ type: "text", nullable: true })
  occursTime!: string | null;

  @Column()
  description!: string;

  @Column()
  locationName!: string;

  @Column()
  indoorsOrOutdoors!: string;

  @Column({ type: "text", nullable: true })
  contactEmail!: string | null;

  @Column({ type: "text", nullable: true })
  contactPhone!: string | null;

  @Column()
  criminalRecordCheckRequired!: boolean;

  @Column({ type: "text", nullable: true })
  idealVolunteer!: string | null;

  @Column({ type: "text", nullable: true })
  additionalInformation!: string | null;

  @Column()
  postedTime!: number;

  @Column()
  postedByUserId!: string;
}
