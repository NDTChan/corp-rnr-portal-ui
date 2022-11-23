export interface IPayload {
  authorName: string;
  cordPayload: {
    expiryDate: string;
    orderInfo: {
      orderId: string;
      planType: string;
    };
    orgInfo: {
      companyNameEng: string;
      branchNameEng: string;
      companyNameChi: string;
      branchNameChi: string;
      companyDocType: string;
      companyDocNo: string;
    };
    rnrInfo: {
      rnrLevel: string;
      accountNo: string[];
      mrt: string[];
      rpTitle: string;
      rpFamilyNameEng: string;
      rpGivenNameEng: string;
      rpFamilyNameChi: string;
      rpGivenNameChi: string;
      rpDocType: string;
      rpDocNo: string;
      rpDob: string;
    };
  };
}

export const defaultValue: Readonly<IPayload> = {
  authorName: '',
  cordPayload: {
    expiryDate: '',
    orderInfo: {
      orderId: '',
      planType: '',
    },
    orgInfo: {
      companyNameEng: '',
      branchNameEng: '',
      companyNameChi: '',
      branchNameChi: '',
      companyDocType: '',
      companyDocNo: '',
    },
    rnrInfo: {
      rnrLevel: '',
      accountNo: [],
      mrt: [],
      rpTitle: '',
      rpFamilyNameEng: '',
      rpGivenNameEng: '',
      rpFamilyNameChi: '',
      rpGivenNameChi: '',
      rpDocType: '',
      rpDocNo: '',
      rpDob: '',
    },
  },
};
