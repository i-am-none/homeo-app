"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "@/components/ui/CustomFormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { useState } from 'react';
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { GenderOptions } from "@/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

const RegisterForm = ({ user} : {user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    defaultValues: {
      email: "",
      phone: "",
    },
  })
 

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData ={name, email, phone};

      const user = await createUser(userData);

      if(user) router.push('/patients/${user.$id}/register')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information.</h2>
          </div>
        </section>

        <CustomFormField
        fieldType = {FormFieldType.INPUT} 
            control={form.control}
            name = "name"
            label="Full Name"
            placeholder = "John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
          fieldType = {FormFieldType.INPUT} 
              control={form.control}
              name = "email"
              label = "Email"
              placeholder = "Johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
          />

          <CustomFormField
          fieldType = {FormFieldType.PHONE_INPUT} 
              control={form.control}
              name = "phone"
              label = "Phone Number"
              placeholder = "909873344"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
          fieldType = {FormFieldType.DATE_PICKER} 
              control={form.control}
              name = "birthDate"
              label = "Date of Birth"
               />

          <CustomFormField
          fieldType = {FormFieldType.SKELETON} 
              control={form.control}
              name = "gender"
              label = "Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                   onValueChange={field.onChange}
                   defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                      <div key={option}
                       className="radio-group">
                        <RadioGroupItem value={option} 
                          id={option}/>
                        <Label htmlFor={option}
                         className="cursor-point">
                          {option}
                          </Label>  

                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>
      
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm