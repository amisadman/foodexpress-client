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
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string(),
});

export function CompleteProfileForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      const toastId = toast.loading("Saving Provider Profile...");
      try {
        let imageUrl = null;

        // 1. Upload image to ImgBB if selected
        if (imageFile) {
          toast.loading("Uploading image...", { id: toastId });
          const formData = new FormData();
          formData.append("image", imageFile);

          const imgRes = await fetch(
            `https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMGBB_API_KEY}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const imgData = await imgRes.json();
          console.log(imgData);
          if (imgData.success) {
            imageUrl = imgData.data.url;
          } else {
            throw new Error("Failed to upload image to ImgBB");
          }
        }

        toast.loading("Creating profile...", { id: toastId });
        
        // 2. Submit to our backend
        const payload = {
          ...value,
          ...(imageUrl && { image: imageUrl }),
        };
        console.log("payload", payload);

        const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/api/v1/providers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
      } catch (err: any) {
        toast.error(err.message || "Something went wrong, please try again.", { id: toastId });
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
            <div className="flex flex-col space-y-2">
              <FieldLabel>Business Image (Optional)</FieldLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>

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
