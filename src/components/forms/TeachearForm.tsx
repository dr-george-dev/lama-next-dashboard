//watch 3:18:0 to create our input we are goin to use react hook form and zod for validation
//https://www.npmjs.com/package/@hookform/resolvers
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.date({ message: "Birthday is required" }),
  sex: z.enum(["male", "female", "other"], { message: "Sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }).optional(),
});

const TeachearForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Informatiom
      </span>
      <InputField
        label="Username"
        name="username"
        defaultValue={data?.username}
        register={register}
        error={errors.username}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        defaultValue={data?.email}
        register={register}
        error={errors.email}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        defaultValue={data?.password}
        register={register}
        error={errors.password}
      />

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeachearForm;
