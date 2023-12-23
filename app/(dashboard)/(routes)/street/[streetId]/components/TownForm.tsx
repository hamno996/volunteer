"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Street } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
});

type StreetFormValue = z.infer<typeof formSchema>;

interface StreetFormProps {
  initialData: Street | null;
}

const StreetForm: React.FC<StreetFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "گۆڕانکاری" : "درووستکردن";
  const description = initialData ? "گۆڕانکاری" : "زیادکردن";
  const toastMessage = initialData ? "گۆڕانکاریکرا" : "درووستکرا";
  const action = initialData ? "گۆڕانکاری" : "درووستکردن";

  const form = useForm<StreetFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: StreetFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/street/${params.streetId}`, data);
      } else {
        await axios.post(`/api/street`, data);
      }
      router.push("/street");
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/street/${params.streetId}`);
      router.push("/street");
      router.refresh();
      toast.success("سڕدرایەوە");
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => onDelete()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ناوی گەڕەک</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ناوی گەڕەک"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default StreetForm;
