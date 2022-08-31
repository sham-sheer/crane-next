export interface CountryOption {
    readonly value: string;
    readonly label: string;
    readonly type: string;
  }

export const countryOption: readonly CountryOption[] = [
  { value: 'US', label: 'United States of America', type: 'countries' },
  { value: 'SG', label: 'Singapore', type: 'countries' },
  { value: 'CA', label: 'Canada', type: 'countries' },
  { value: 'NZ', label: 'New Zealand', type: 'countries' },
  { value: 'AU', label: 'Australia', type: 'countries' },
];