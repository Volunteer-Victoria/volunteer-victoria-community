import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "messageThread" })
export class MessageThreadEntity {
  @PrimaryColumn()
  applicantInboxId!: string;

  @Column()
  posterInboxId!: string;

  @Column()
  createdOn!: string;
}
