import Image from "next/image"
import { redirect } from "next/navigation";
import Link from "next/link"
import RegisterForm from "@/components/forms/RegisterForm"
import { getUser } from "@/lib/actions/patient.actions";
import { createUser } from "@/lib/actions/patient.actions";
// import { getPatient } from "@/lib/actions/patient.actions";

const Register = async ({params: { userId } } : {params: { userId: string }}) => {
  console.log("Fetched userId:", userId);
  const user = await getUser(userId);
  console.log(user);
  // const patient = await getPatient(userId);

  // if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
              src = "/assets/icons/logo-full.svg"
              height = {1000}
              width={1000}
              alt="Homeo"
              className="mb-12 h-10 w-fit"
          />
          
          <RegisterForm user = { user }/>

            <p className="copyright py-12">
            © 2024 Homeo
            </p>
          
        </div> 
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]" 
        />
   </div>
  );
};

export default Register;