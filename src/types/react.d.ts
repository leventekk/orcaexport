type CreateReducerAction<T extends string, P = unknown> = P extends object
  ? { type: T; payload: P }
  : { type: T };
