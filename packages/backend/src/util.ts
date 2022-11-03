import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidateIf } from "class-validator";
import { nanoid } from "nanoid";

export function uniqueId(): string {
  return nanoid();
}

export const isRunningInUnitTest: boolean =
  process.env["NODE_ENV"] === "test" ||
  process.env["JEST_WORKER_ID"] !== undefined;

export const isRunningLocally: boolean =
  process.env["NODE_ENV"] === "development" || isRunningInUnitTest;

export const IsNullable = () => ValidateIf((_, value) => value !== null);

export function transformAndValidate<T>(
  targetClass: ClassConstructor<T>,
  rawValue: any
): T {
  const result = plainToInstance(targetClass, rawValue);
  validate(result as object);
  return result;
}
