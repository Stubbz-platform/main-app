'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
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
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import GoogleLogo from "/public/images/google_logo.png";
import { Eye, EyeOff, Loader } from "lucide-react";

import FormDivider from '../common/FormDivider';
import FormsHeading from '../common/FormsHeading';
import WalletConnectDialog from '../common/WalletConnectDialog';
import { ToastAction } from '../ui/toast';
import { useSearchParams } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Please enter an email",
  }).email("This is not a valid email"),
  password: z.string().trim().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export interface Iuser {
  email: string,
  id: string,
  name: string,
  image: string,
  connectedWallet: boolean,

}

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const params = useSearchParams();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.connectedWallet) {
      setTimeout(() => {
        toast({
          variant: "successful",
          title: "You're Logged In 🎉",
          description: "Login was successful!",
        });
      }, 2000);
      setOpenDialog(true);
    }
    if (params.get("error")) {
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Oops!",
          description: "Sorry, login failed",
          action: (
            <ToastAction altText="Try again">Please Try Again</ToastAction>
          ),
        });
      }, 2000);
    }
  }, [status, session, params, toast])

  const handleSignIn = async(data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    //optional inclusion of toast if response is not okay
  }

  return (
    <div className="border rounded-xl p-10 flex flex-col space-y-8">
      <FormsHeading page="Sign In" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="space-y-5 pt-6"
        >
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
                <FormLabel className="flex justify-between">
                  <div className="space-x-1">
                    <span className="text-[16px] font-medium">Password</span>
                    <span className="text-red-600">*</span>
                  </div>
                  <Link href="/" className="text-red-600 underline">
                    Forgot Password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="*********"
                    className="text-[16px]"
                    {...field}
                  />
                </FormControl>
                {isPasswordVisible ? (
                  <Eye
                    className="absolute right-4 top-6 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                  />
                ) : (
                  <EyeOff
                    className="absolute right-4 top-6 opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full space-x-2"
          >
            {status === "loading" && (
              <Loader className="h-5 w-5 animate-spin" />
            )}
            <span>Login In</span>
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
          <span className="text-[16px]">Log in with Google</span>
        </Button>

        <div className="space-x-2 self-center">
          <span>Don&aptos;t have an account?</span>
          <Link href="/sign-up" className="text-[#4148FE] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
      <WalletConnectDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
}

export default LoginForm