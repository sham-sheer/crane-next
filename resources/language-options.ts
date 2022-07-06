export interface LanguageOption {
    readonly value: string;
    readonly label: string;
  }

export const languageOption: readonly LanguageOption[] = [
  { value: 'EN', label: 'English' },
  { value: 'FR', label: 'French' },
  { value: 'SP', label: 'Spanish' },
  { value: 'GR', label: 'German' },
  { value: 'CN', label: 'Chinese' },
];