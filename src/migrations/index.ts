import * as migration_20260804_072729 from './20260804_072729';
import * as migration_20260804_081359 from './20260804_081359';

export const migrations = [
  {
    up: migration_20260804_072729.up,
    down: migration_20260804_072729.down,
    name: '20260804_072729',
  },
  {
    up: migration_20260804_081359.up,
    down: migration_20260804_081359.down,
    name: '20260804_081359'
  },
];
