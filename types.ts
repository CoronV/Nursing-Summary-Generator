export enum AdlLevel {
  INDEPENDENT = '自立',
  WATCHING = '見守り',
  PARTIAL_ASSISTANCE = '一部介助',
  FULL_ASSISTANCE = '全介助',
  UNABLE = '不能・実施なし',
}

export enum Gender {
  MALE = '男性',
  FEMALE = '女性',
  OTHER = 'その他',
}

export interface PatientData {
  // 1. 患者基本情報
  name: string;
  age: string;
  gender: Gender;
  admissionDate: string;
  dischargeDate: string;
  diagnosis: string;

  // 2. 入院時の状況
  admissionReason: string;
  admissionAdl: {
    eating: AdlLevel;
    toileting: AdlLevel;
    dressing: AdlLevel;
    bathing: AdlLevel;
    mobility: AdlLevel;
  };
  admissionCognition: string;

  // 3. 治療と医学的経過
  treatmentProgress: string;
  testResults: string;
  vitalSigns: string;

  // 4. リハビリテーションの経過
  rehabIntervention: string;
  rehabGoalAchievement: string;
  currentAdl: {
    eating: AdlLevel;
    toileting: AdlLevel;
    dressing: AdlLevel;
    bathing: AdlLevel;
    mobility: AdlLevel;
  };
  assistiveDevices: string;

  // 5. 看護上の重要項目
  risks: {
    pressureUlcer: string;
    fallRisk: string;
    swallowingFunction: string;
  };
  care: {
    toiletingCare: string;
    hygieneCare: string;
    communication: string;
    cognitiveMentalState: string;
  };
  kaigoLevel: string;
  jiritsudoDisabled: string;
  jiritsudoDementia: string;

  // 6. 社会的背景と退院支援
  keyPerson: string;
  dischargeLocation: string;
}