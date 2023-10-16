"use client";
import { ButtonHTMLAttributes, FormEvent, SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

import FormDivider from "../common/FormDivider";
import FormsHeading from "../common/FormsHeading";
import GoogleLogo from "/public/images/google_logo.png";
import { ToastAction } from "../ui/toast";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import WalletConnectDialog from "../common/WalletConnectDialog";
import ComingSoonDialog from "../common/ComingSoonDialog";



const FormSchema = z
  .object({
    name: z.string().trim().min(3, {
        message: "Name must be at least 3 characters long",
    }),
    email: z
      .string()
      .min(1, {
        message: "Please enter an email",
      })
      .email("This is not a valid email"),
    password: z.string().trim().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().trim().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });;

const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [currentFormState, setCurrentFormState] = useState<
    "initial" | "authenticating"
  >("initial");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toast } = useToast();
  const route = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
  });
  

  const handleSignUp = async(
    data: z.infer<typeof FormSchema>) => {    
    const { name, email, password } = data;
    try {
        setCurrentFormState("authenticating");
        const response = await fetch(
          "/api/auth/signup",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );
        console.log({response})
        if(response.ok) {
            toast({
              variant: "successful",
              title: "Congratulations 🎉",
              description: "Your account was successfully created!",
            });
            setOpenDialog(true);
        } else {
            toast({
                variant: "destructive",
                title: "Oops!",
                description: "Account Creation Failed",
                action: <ToastAction altText="Try again">Please Try Again</ToastAction>,
            });
        }
        response.status === 200 && route.push("/login")
    } catch (error) {
        console.log(error)
    }
    setCurrentFormState("initial");
  };

  return (
    <div className="border rounded-xl p-4 md:p-10 flex flex-col space-y-8">
      <FormsHeading page="Sign Up" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignUp)}
          className="space-y-5 pt-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Your Name</span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Jennifer Gunna"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Email</span>
                  <span className="text-red-600 font-medium">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">Password</span>
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl className="flex">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="*********"
                    {...field}
                    className="text-[16px]"
                  />
                </FormControl>
                {isPasswordVisible ? (
                  <Eye
                    className="absolute right-4 top-8 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-4 top-8 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="space-x-1">
                  <span className="text-[16px] font-medium">
                    Confirm Password
                  </span>
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="*********"
                    {...field}
                    className="text-[16px]"
                  />
                </FormControl>
                {isConfirmPasswordVisible ? (
                  <Eye
                    className="absolute right-4 top-8 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() =>
                      setIsConfirmPasswordVisible((visible) => !visible)
                    }
                  />
                ) : (
                  <EyeOff
                    className="absolute right-4 top-8 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() =>
                      setIsConfirmPasswordVisible((visible) => !visible)
                    }
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full space-x-2"
            disabled={currentFormState === "authenticating"}
          >
            {currentFormState === "authenticating" && (
              <Loader className="h-5 w-5 animate-spin" />
            )}
            <span>Sign Up</span>
          </Button>
        </form>
      </Form>

      <FormDivider />
      <div className="space-y-5 flex flex-col">
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Image src={GoogleLogo} alt="google_logo" />
          <span className="text-[16px]">Sign up with Google</span>
        </Button>

        <div className="space-x-2 self-center">
          <span>Have an account?</span>
          <Link href="/login" className="text-[#4148FE] hover:underline">
            Log In
          </Link>
        </div>
      </div>
      <ComingSoonDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      {/* <WalletConnectDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      /> */}
    </div>
  );
};

export default SignupForm;
