import { Injectable } from "@nestjs/common";
import type { Table } from "dynamodb-toolbox";

@Injectable()
export class DynamoDBService {
  constructor(public readonly table: Table<string, "pk", "sk">) {}
}
