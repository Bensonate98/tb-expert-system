-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_patientId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
