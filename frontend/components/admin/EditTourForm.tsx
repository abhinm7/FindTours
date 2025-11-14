"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { updateTour } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Form, FormField, FormItem, FormLabel, FormMessage, FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Tour } from "@/lib/types";

const editTourSchema = z.object({
  title: z.string().min(2),
  destination: z.string().min(2),
  price: z.number().min(1),
  startDate: z.string(),
  endDate: z.string(),
  image: z.any().optional(), 
});

type EditTourFormValues = z.infer<typeof editTourSchema>;

export function EditTourForm({ tour }: { tour: Tour }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditTourFormValues>({
    resolver: zodResolver(editTourSchema),
    defaultValues: {
      title: tour.title,
      destination: tour.destination,
      price: tour.price,
      startDate: tour.startDate.split("T")[0],
      endDate: tour.endDate.split("T")[0],
      image: undefined,
    },
  });

  const { register } = form;

  const onSubmit = (values: EditTourFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("destination", values.destination);
    formData.append("price", values.price.toString());
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);

    // Only append image if user selected one
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    startTransition(async () => {
      const res = await updateTour(tour._id, formData);

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success("Tour updated!");
      }
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
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
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

        {/* Replace Image */}
        <FormItem>
          <FormLabel>Replace Image (optional)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Submit */}
        <Button disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Update Tour"
          )}
        </Button>
      </form>
    </Form>
  );
}
