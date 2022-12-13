import { RnrInfo } from 'app/shared/model/rnr-info.model';

export interface IRnrSubmit {
  payloadId: string;
  disclaimer: string;
  disclaimerNoHkid: string;
  disclaimerNoChineseName: string;
  rnrInfo: RnrInfo;
}
