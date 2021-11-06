import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FieldsetHTMLAttributes,
  AnchorHTMLAttributes,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

/**
 * Generic props for rootless components.
 */
export interface BaseProps extends PropsWithChildren<Record<string, unknown>> {}

/**
 * Accepts all props related to the DOM interface of the root component.
 */
export interface ElementProps<DOMInterface>
  extends DetailedHTMLProps<HTMLAttributes<DOMInterface>, DOMInterface> {}

export interface AnchourProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export interface FormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

export interface FieldSetProps
  extends DetailedHTMLProps<
    FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  > {}

export interface OptionProps
  extends DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {}

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}
