/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from "../types";
import type { PropertyValue } from "../types/prop-type";
import type { Properties } from "../types/csstype";
import type { Tokens } from "../tokens";

export type CenterProperties = {
  inline?: ConditionalValue<boolean>;
};

type CenterOptions = CenterProperties & Omit<SystemStyleObject, keyof CenterProperties>;

export declare function center(options?: CenterOptions): string;
