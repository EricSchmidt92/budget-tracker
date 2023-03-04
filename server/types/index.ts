export type AuthorizeProps<T extends string> = {
  [K in `${T}Id`]: string;
} & {
  userId: string;
};
