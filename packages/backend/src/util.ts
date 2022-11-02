import { nanoid } from "nanoid";

export function uniqueId(): string {
  return nanoid();
}

export const isRunningInUnitTest: boolean =
  process.env["NODE_ENV"] === "test" ||
  process.env["JEST_WORKER_ID"] !== undefined;

export const isRunningLocally: boolean =
  process.env["NODE_ENV"] === "development" || isRunningInUnitTest;
