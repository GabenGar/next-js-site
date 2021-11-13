import type { PropsWithChildren, ComponentPropsWithoutRef } from "react";

/**
 * Generic props for rootless components.
 */
export interface RootlessProps
  extends PropsWithChildren<Record<string, unknown>> {}

export interface BaseProps extends ComponentPropsWithoutRef<"section"> {}

export interface DivProps extends ComponentPropsWithoutRef<"div"> {}

export interface AnchourProps extends ComponentPropsWithoutRef<"a"> {}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export interface FormProps extends ComponentPropsWithoutRef<"form"> {}

export interface InputProps extends ComponentPropsWithoutRef<"input"> {}

export interface LabelProps extends ComponentPropsWithoutRef<"label"> {}

export interface FieldSetProps extends ComponentPropsWithoutRef<"fieldset"> {}

export interface OptionProps extends ComponentPropsWithoutRef<"option"> {}

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {}

export interface DescriptionListProps extends ComponentPropsWithoutRef<"dl"> {}

export interface SpanProps extends ComponentPropsWithoutRef<"span"> {}

export interface ImgProps extends ComponentPropsWithoutRef<"img"> {}

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {}
