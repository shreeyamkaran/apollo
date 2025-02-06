import { z } from "zod";

const calculateAge = (dob: Date) => {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string()
    .length(10, { message: "Mobile must be 10 digits" })
    .regex(/^\d+$/, { message: "Mobile must contain only digits" }),
  pan: z.string()
    .length(10, { message: "PAN must be 10 characters" })
    .regex(/^[A-Z]{5}\d{4}[A-Z]$/, { message: "Invalid PAN format" }),
  gender: z.enum(["male", "female", "transgender"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be Male, Female, or Transgender"
  }),
  dob: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format"
  }),
  caste: z.enum(["general", "obc", "pvtg", "sc", "st"], {
    required_error: "Caste is required",
    invalid_type_error: "Invalid caste value"
  }),
  maritalStatus: z.enum(["married", "never married", "divorced", "widowed"], {
    required_error: "Marital status is required",
    invalid_type_error: "Invalid marital status"
  }),
  educationalQualification: z.enum(
    ["8th pass", "10th pass", "12th pass", "Graduate", "Diploma", "Post Graduate"], {
    required_error: "Educational qualification is required",
    invalid_type_error: "Invalid qualification"
  }),
  isAbove18: z.boolean().default(false),
  isSeniorCitizen: z.boolean().default(false),
}).transform((data) => {
  const age = calculateAge(data.dob);
  return {
    ...data,
    isAbove18: age >= 18,
    isSeniorCitizen: age >= 60
  };
});

export type TUserSchema = z.infer<typeof UserSchema>;