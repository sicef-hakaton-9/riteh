"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Endpoints from "@/constants/enums/Endpoints";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 10 characters."
  })
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(formSchema)
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email as string,
      password: values.password as string
    });
  }

  async function handeGoogleSignIn() {
    await signIn("google", {
      callbackUrl: "http://localhost:3000/",
      redirect: false
    });
  }

  const t = useTranslations("auth");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="heading3">{t("login")}</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t("password")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {t("submit")}
          </Button>

          <Separator className="!mt-4 !mb-4" />

          <Button type="button" className="w-full !mt-0" onClick={handeGoogleSignIn}>
            <Image
              src="/images/google-logo.svg"
              width={20}
              height={20}
              alt="google logo"
              className="pr-2"
            />
            {t("googleProvider.title")}
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-xs">
        {t("dontHaveAccount")}
        <a href={Endpoints.REGISTER} className="font-bold">
          {" "}
          {t("register")}
        </a>
      </p>
    </>
  );
}
