import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
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

export function RequireAuth(): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    UseGuards(AuthGuard("jwt"))(target, propertyKey, descriptor);
    ApiBearerAuth()(target, propertyKey, descriptor);
  };
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
