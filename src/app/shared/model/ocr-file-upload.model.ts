import { defaultValueRnrInfo, RnrInfo } from 'app/shared/model/rnr-info.model';

export interface IOcrFileUpload {
  clientCfg: string;
  rnrInfo: RnrInfo;
}

export const defaultValue: Readonly<IOcrFileUpload> = {
  clientCfg: '',
  rnrInfo: defaultValueRnrInfo,
};
