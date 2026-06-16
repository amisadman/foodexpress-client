"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { env } from "../../../../env";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string(),
});

export function CompleteProfileForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving Provider Profile");
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/v1/providers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
          credentials: "include", // Ensure session cookies are sent
        });

        const data = await res.json();

        if (!data.success) {
          toast.error(data.message || "Failed to create profile", { id: toastId });
          return;
        }

        toast.success("Profile completed successfully!", { id: toastId });
        router.refresh();
        router.push("/");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card {...props} className="w-full max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Complete Provider Profile</CardTitle>
        <CardDescription>
          Tell us about your business to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="complete-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Business Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="location"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="complete-profile-form" type="submit" className="w-full">
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
