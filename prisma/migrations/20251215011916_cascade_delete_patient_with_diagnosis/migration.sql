-- DropForeignKey
ALTER TABLE "public"."Diagnosis" DROP CONSTRAINT "Diagnosis_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
