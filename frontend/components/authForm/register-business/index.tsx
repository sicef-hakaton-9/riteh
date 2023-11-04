"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { registerBusiness } from "@/services/auth";
import { useRouter } from "next/navigation";
import Endpoints from "@/constants/enums/Endpoints";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  address: z.string().min(3, {
    message: "Address must be at least 3 characters."
  }),
  city: z.string().min(3, {
    message: "City must be at least 3 characters."
  }),
  country: z.string().min(3, {
    message: "Country must be at least 3 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email."
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 10 characters."
  })
});

export function RegisterBusinessForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(formSchema)
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerBusiness(values)
      .then((res) => {
        if (res.status !== 201) throw new Error();
        signIn("credentials", {
          email: values.email as string,
          password: values.password as string,
          redirect: false,
          redirectUrl: Endpoints.HOME
        }).then(() => {
          router.push(Endpoints.HOME);
        });
      })
      .catch((err) => {
        toast({
          description: err.message,
          title: t("error"),
          variant: "destructive"
        });
      });
  }

  const t = useTranslations("auth");

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-h-[70vh]"
        >
          <h1 className="heading3">{t("register")}</h1>
          <div className="flex flex-col wrap space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name")} {...field} />
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("address")} {...field} />
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
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("city")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("city")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("country")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("country")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            {t("submit")}
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-xs">
        {t("alreadyHaveAccount")}
        <a href={Endpoints.LOGIN} className="font-bold">
          {" "}
          {t("login")}
        </a>
      </p>
      <p className="mt-2 text-xs">
        {t("notABusiness")}
        <a href={Endpoints.REGISTERBUSINESS} className="font-bold">
          {" "}
          {t("registerAsUser")}
        </a>
      </p>
    </>
  );
}
