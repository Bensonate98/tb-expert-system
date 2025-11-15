export interface CreatePatientDto {
    fullName: string;
    age: number;
    gender: "male" | "female";
    phone: string;
    address: string;
}

export interface CreateDiagnosisDto {
    patientId: string;
    cough2Weeks: boolean;
    nightSweat: boolean;
    weightLoss: boolean;
    fever: boolean;
    chestPain: boolean;
    bloodInSputum: boolean;
    fatigue?: boolean;
    contactWithTb?: boolean;
    result: string;
}

export interface CreateReportDto {
    patientId: string;
    diagnosisId: string;
    reportText: string;
}
