export interface LocalStore {
  0: () => string | false
  1: (value: string) => boolean
  2: (callback: onChangeCallback) => void
}

export type onChangeCallback = (
  oldValue: string | null,
  newValue: string | null
) => void;
