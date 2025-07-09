import { AdlLevel, Gender, PatientData } from './types';

export const ADL_LEVELS = Object.values(AdlLevel);
export const GENDERS = Object.values(Gender);

export const KAIGO_LEVELS = ['未設定', '要支援1', '要支援2', '要介護1', '要介護2', '要介護3', '要介護4', '要介護5'];
export const JIRITSUDO_DISABLED_LEVELS = ['未設定', '自立', 'J1', 'J2', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const JIRITSUDO_DEMENTIA_LEVELS = ['未設定', '自立', 'I', 'IIa', 'IIb', 'IIIa', 'IIIb', 'IV', 'M'];

export const BLANK_PATIENT_DATA: PatientData = {
  name: '',
  age: '',
  gender: Gender.MALE,
  admissionDate: '',
  dischargeDate: '',
  diagnosis: '',
  admissionReason: '',
  admissionAdl: {
    eating: AdlLevel.INDEPENDENT,
    toileting: AdlLevel.INDEPENDENT,
    dressing: AdlLevel.INDEPENDENT,
    bathing: AdlLevel.INDEPENDENT,
    mobility: AdlLevel.INDEPENDENT,
  },
  admissionCognition: '',
  treatmentProgress: '',
  testResults: '',
  vitalSigns: '',
  rehabIntervention: '',
  rehabGoalAchievement: '',
  currentAdl: {
    eating: AdlLevel.INDEPENDENT,
    toileting: AdlLevel.INDEPENDENT,
    dressing: AdlLevel.INDEPENDENT,
    bathing: AdlLevel.INDEPENDENT,
    mobility: AdlLevel.INDEPENDENT,
  },
  assistiveDevices: '',
  risks: {
    pressureUlcer: '',
    fallRisk: '',
    swallowingFunction: '',
  },
  care: {
    toiletingCare: '',
    hygieneCare: '',
    communication: '',
    cognitiveMentalState: '',
  },
  kaigoLevel: KAIGO_LEVELS[0],
  jiritsudoDisabled: JIRITSUDO_DISABLED_LEVELS[0],
  jiritsudoDementia: JIRITSUDO_DEMENTIA_LEVELS[0],
  keyPerson: '',
  dischargeLocation: '',
};

export const INITIAL_PATIENT_DATA: PatientData = {
  name: '山田 花子',
  age: '85',
  gender: Gender.FEMALE,
  admissionDate: '2023-10-01',
  dischargeDate: '2023-11-15',
  diagnosis: '右大腿骨頸部骨折',
  admissionReason: '自宅で転倒し、右股関節の痛みを訴え救急搬送。',
  admissionAdl: {
    eating: AdlLevel.INDEPENDENT,
    toileting: AdlLevel.FULL_ASSISTANCE,
    dressing: AdlLevel.PARTIAL_ASSISTANCE,
    bathing: AdlLevel.UNABLE,
    mobility: AdlLevel.FULL_ASSISTANCE,
  },
  admissionCognition: 'JCS I-1。見当識は時間、場所ともに保たれていた。',
  treatmentProgress: '右大腿骨骨接合術を施行。術後経過は良好。疼痛コントロールのため適宜鎮痛剤使用。',
  testResults: '術後X線にて骨接合部の良好な整復位を確認。貧血が進行したが、鉄剤投与により改善傾向。',
  vitalSigns: '術後3日目に38.0℃の発熱があったが、抗菌薬投与にて解熱。以降は安定して推移。',
  rehabIntervention: 'PT（理学療法）、OT（作業療法）を週5回実施。',
  rehabGoalAchievement: '当初目標であった「T字杖での屋内自立歩行」を達成。',
  currentAdl: {
    eating: AdlLevel.INDEPENDENT,
    toileting: AdlLevel.WATCHING,
    dressing: AdlLevel.INDEPENDENT,
    bathing: AdlLevel.PARTIAL_ASSISTANCE,
    mobility: AdlLevel.WATCHING,
  },
  assistiveDevices: '屋内移動時にT字杖を使用。トイレ、入浴時に手すりを使用。',
  risks: {
    pressureUlcer: '仙骨部に発赤があったが、体位交換とドレッシング材保護にて改善し、現在はなし。',
    fallRisk: '入院時転倒リスクスコア10点。離床センサーを使用していたが、現在は不要。',
    swallowingFunction: '嚥下機能に問題なし。食事形態は常食。',
  },
  care: {
    toiletingCare: '日中はポータブルトイレ使用。夜間はパッドを使用。トイレへの移動は見守り。',
    hygieneCare: '週2回のシャワー浴。洗身、洗髪は一部介助。',
    communication: '軽度の難聴あり。補聴器は不使用。正面から、少し大きな声で話すとコミュニケーション良好。',
    cognitiveMentalState: '夜間に軽度のせん妄が見られたが、環境調整と声かけで対応。日中は穏やかに過ごせている。',
  },
  kaigoLevel: '要介護2',
  jiritsudoDisabled: 'A1',
  jiritsudoDementia: 'IIb',
  keyPerson: '長男（山田 太郎）',
  dischargeLocation: '自宅へ退院。退院後は長男夫婦と同居予定。',
};