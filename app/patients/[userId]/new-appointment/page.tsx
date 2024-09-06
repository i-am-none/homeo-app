import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
// import { PasskeyModal } from "@/components/PasskeyModal";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";


export default async function NewAppointment({ params: { userId, patientId}}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
   <div className="flex h-screen max-h-screen">
       
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image 
              src = "/assets/icons/logo-full.svg"
              height = {1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
          />
          <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient?.id}
          />

            <p className="copyright mt-10 py-12">
            © 2024 Homeo
            </p>
        </div> 
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom" 
        />
   </div>
  );
};