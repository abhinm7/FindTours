"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createTour } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Form, FormField, FormItem, FormLabel, FormMessage, FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { tourSchema, TourFormValues } from "@/lib/schema";

export function CreateTourForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      destination: "",
      price: undefined,
      startDate: "",
      endDate: "",
      image: undefined,
    },
  });


  const { register } = form;

  const onSubmit = (values: TourFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("destination", values.destination);
    formData.append("price", values.price.toString());
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);
    formData.append("image", values.image[0]);

    startTransition(async () => {
      const res = await createTour(formData);
      if (res?.success === false) toast.error(res.message);
      else toast.success("Tour created!");

      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Destination */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : Number(val));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormItem>
          <FormLabel>Tour Image</FormLabel>
          <FormControl>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="border p-2 rounded w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>


        {/* Submit */}
        <Button disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Tour"}
        </Button>
      </form>
    </Form>
  );
}
