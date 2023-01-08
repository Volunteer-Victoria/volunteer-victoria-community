import { Column, ManyToOne, JoinColumn, Entity, PrimaryColumn } from "typeorm";
import { OpportunityEntity } from "../opportunity/opportunity.entity";

@Entity({ name: "messageThread" })
export class MessageThreadEntity {
  @PrimaryColumn()
  applicantInboxId!: string;

  @Column()
  applicantName!: string;

  @Column()
  applicantEmail!: string;

  @Column()
  applicantUserId!: string;

  @Column()
  posterInboxId!: string;

  @Column()
  posterName!: string;

  @Column()
  posterEmail!: string;

  @ManyToOne(() => OpportunityEntity, { nullable: false })
  @JoinColumn({ name: "opportunityId" })
  opportunity?: OpportunityEntity;

  @Column()
  createdAt!: number;
}
