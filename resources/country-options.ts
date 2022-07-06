export interface CountryOption {
    readonly value: string;
    readonly label: string;
  }

export const countryOption: readonly CountryOption[] = [
  { value: 'US', label: 'United States of America' },
  { value: 'SG', label: 'Singapore' },
  { value: 'CA', label: 'Canada' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'AU', label: 'Australia' },
];