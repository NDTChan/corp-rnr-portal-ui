export interface IOcrResult {
  httpStatusCode: number;
  retCode: number;
  errReason: string;
}

export const defaultValue: Readonly<IOcrResult> = {
  httpStatusCode: 200,
  retCode: 0,
  errReason: 'Successful.',
};
