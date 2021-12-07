export interface LocalStore{
  get: () => string | false
  set: (value: string) => boolean
  onChange: (callback: OnChangeCallback) => void
}

export type OnChangeCallback = (
  oldValue: string | null,
  newValue: string | null
) => void;
