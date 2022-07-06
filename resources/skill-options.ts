export interface SkillOption {
    readonly value: string;
    readonly label: string;
  }

export const skillOption: readonly SkillOption[] = [
  { value: 'CP', label: 'Carpenter' },
  { value: 'ZK', label: 'Zookeeper' },
  { value: 'CL', label: 'Cleaner' },
  { value: 'OP', label: 'Operator' },
  { value: 'TN', label: 'Technician' },
];