import { HttpException, HttpStatus } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateOrReject, ValidatorOptions } from "class-validator";
import { nanoid } from "nanoid";

export function uniqueId(): string {
  return nanoid();
}

export const isRunningInUnitTest: boolean =
  process.env["NODE_ENV"] === "test" ||
  process.env["JEST_WORKER_ID"] !== undefined;

export const isRunningLocally: boolean =
  process.env["NODE_ENV"] === "development" || isRunningInUnitTest;

export async function transformAndValidate<T>(
  targetClass: ClassConstructor<T>,
  rawValue: any[],
  options?: ValidatorOptions
): Promise<T[]>;

export async function transformAndValidate<T>(
  targetClass: ClassConstructor<T>,
  rawValue: any,
  options?: ValidatorOptions
): Promise<T>;

export async function transformAndValidate<T>(
  targetClass: ClassConstructor<T>,
  rawValue: any | any[],
  options: ValidatorOptions = { whitelist: true }
): Promise<T | T[]> {
  const result: T | T[] = plainToInstance(targetClass, rawValue);
  if (Array.isArray(result)) {
    for (const value of result) {
      await validateOrReject(value as object, options);
    }
  } else {
    await validateOrReject(result as object, options);
  }
  return result;
}

/** Going from a REST API to a database */
export function undefinedToNull(keysFrom: any, dataFrom: any): any {
  const result = { ...dataFrom };
  for (const key of Object.keys(keysFrom)) {
    if (result[key] === undefined) {
      result[key] = null;
    }
  }
  return result;
}

/** Going from a database to a REST API */
export function nullToUndefined(target: any): any {
  const result = { ...target };
  for (const [key, value] of Object.entries(result)) {
    if (value === null) {
      delete result[key];
    }
  }
  return result;
}

/**
 * Since we are using an SPA we need to set-up all 404s to redirect to index.html.
 * This is a global setting in CloudFront rather than per-origin so we can't use 404s
 * as API responses without it redirecting.
 */
export class CustomNotFoundException extends HttpException {
  constructor(
    objectOrError?: string | object | any,
    description: string = "Not Found"
  ) {
    super(
      HttpException.createBody(
        objectOrError,
        description,
        HttpStatus.BAD_REQUEST
      ),
      HttpStatus.BAD_REQUEST
    );
  }
}

export function concatObjects<V>(xs: Record<string, V>[]): Record<string, V[]> {
  const result: Record<string, V[]> = {};
  for (const x of xs) {
    for (const k of Object.keys(x)) {
      if (result[k] === undefined) {
        result[k] = [];
      }
      result[k]!.push(x[k]!);
    }
  }
  return result;
}

export function batch<A>(xs: A[], batchSize: number): A[][] {
  let currentBatch: A[] = [];
  const result: A[][] = [];
  for (let i = 0; i < xs.length; i++) {
    if (i % batchSize === 0) {
      currentBatch = [];
      result.push(currentBatch);
    }
    currentBatch.push(xs[i]!);
  }
  return result;
}
