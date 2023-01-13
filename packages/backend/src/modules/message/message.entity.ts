import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "message" })
export class MessageEntity {
  @PrimaryColumn()
  messageId!: string;

  @Column()
  recipientInboxId!: string;

  @Column()
  senderEmailAddress!: string;

  @Column()
  sentAt!: number;
}
