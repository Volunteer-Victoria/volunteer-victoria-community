import { nanoid } from "nanoid";

export function uniqueId(): string {
  return nanoid();
}

export const isRunningLocally: boolean =
  process.env["NODE_ENV"] === "development";

export const isRunningInUnitTest: boolean =
  process.env["JEST_WORKER_ID"] !== undefined;
