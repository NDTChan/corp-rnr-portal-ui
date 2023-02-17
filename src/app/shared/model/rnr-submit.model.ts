import { RnrInfo } from 'app/shared/model/rnr-info.model';

export interface IRnrSubmit {
  payloadId: string;
  disclaimerPrivacyStatement: boolean;
  disclaimerOverAgeOf18: boolean;
  disclaimerNoHkid: boolean;
  disclaimerNoChineseName: string;
  rpFamilyNameEng: string;
  rpGivenNameEng: string;
  rpFamilyNameChi: string;
  rpGivenNameChi: string;
  rpDocType: string;
  rpPassport: string;
  rpDobD: string;
  rpDobM: string;
  rpDobY: string;
  rpID1: string;
  rpID2: string;
  rpID3: string;
}
