export interface IOcrPermission {
  httpStatusCode: number;
  retCode: number;
  errReason: string;
}

export const defaultValue: Readonly<IOcrPermission> = {
  httpStatusCode: 200,
  retCode: 0,
  errReason: 'Successful.',
};
