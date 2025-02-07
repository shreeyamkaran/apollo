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
  dob: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format"
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be Male, Female, or Transgender"
  }),
  caste: z.enum(["General", "OBC", "PVTG", "SC", "ST"], {
    required_error: "Caste is required",
    invalid_type_error: "Invalid caste value"
  }),
  maritalStatus: z.enum(["Married", "Never Married", "Divorced", "Widowed"], {
    required_error: "Marital status is required",
    invalid_type_error: "Invalid marital status"
  }),
  educationalQualification: z.enum(
    ["8th Pass", "10th Pass", "12th Pass", "Graduate", "Post-Graduate"], {
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