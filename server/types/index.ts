export type AuthorizeProps<T extends string = string> = {
  [K in `${T}Id`]: string;
} & {
  userId: string;
};
