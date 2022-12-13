enum RnrLevel {
  'CN',
  'ACCT',
  'MRT',
  '',
}

enum RpTitle {
  'Mr.',
  'Mrs.',
  'Ms.',
  '',
}

enum RpDocType {
  'HKID',
  'PASS',
  '',
}

export interface RnrInfo {
  rnrLevel: keyof typeof RnrLevel;
  accountNo: Array<string>;
  Mrt: Array<string>;
  rpTitle: keyof typeof RpTitle;
  rpFamilyNameEng: string;
  rpGivenNameEng: string;
  rpFamilyNameChi: string;
  rpGivenNameChi: string;
  rpDocType: keyof typeof RpDocType;
  rpDocNo: string;
  rpDob: string;
}

export const defaultValueRnrInfo: Readonly<RnrInfo> = {
  rnrLevel: '',
  accountNo: new Array<string>(),
  Mrt: new Array<string>(),
  rpTitle: '',
  rpFamilyNameEng: '',
  rpGivenNameEng: '',
  rpFamilyNameChi: '',
  rpGivenNameChi: '',
  rpDocType: '',
  rpDocNo: '',
  rpDob: '',
};
