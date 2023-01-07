import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "message" })
export class MessageEntity {
  @PrimaryColumn()
  applicantInboxId!: string;

  @Column()
  posterInboxId!: string;

  @Column()
  createdOn!: string;
}
