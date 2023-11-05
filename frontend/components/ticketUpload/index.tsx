"use client";

import { useEffect, useState } from "react";
import ImageUpload from "../imageUpload";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { submitTicket } from "@/services/ticket";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  category: z.string(),
  description: z.string(),
  image: z.string(),
  title: z.string()
});

export default function TicketUpload() {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      category: "",
      description: "",
      image: "",
      title: ""
    },
    resolver: zodResolver(formSchema)
  });

  const [fileBase64, setFileBase64] = useState<string>();
  const [coords, setCoords] = useState({});

  const session = useSession();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitTicket(
      {
        ...values,
        image: fileBase64?.split(",")[1],
        x: (
          coords as {
            lat: number;
            lng: number;
          }
        ).lat,
        y: (
          coords as {
            lat: number;
            lng: number;
          }
        ).lng
      },
      session.data?.accessToken as string
    );
  };

  const fetchCoords = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  };

  useEffect(() => {
    fetchCoords();
  }, []);

  const t = useTranslations();

  return (
    <Card className="w-[500px] h-[600px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4">
          <h1 className="heading3">--ticket upload</h1>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormControl>
                  <ImageUpload setFileBase64={setFileBase64} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="--Ticket Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--description</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="--Ticket Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trash">--trash</SelectItem>
                    <SelectItem value="traffic">--traffic</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {t("submit")}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
