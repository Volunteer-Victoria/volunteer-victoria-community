import { Attribute, Entity } from "@typedorm/common";

@Entity({
  name: "opportunity",
  primaryKey: {
    partitionKey: "ORG#{{id}}",
    sortKey: "ORG#{{id}}",
  },
})
export class Organisation {
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  status: string;

  @Attribute()
  active: boolean;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
