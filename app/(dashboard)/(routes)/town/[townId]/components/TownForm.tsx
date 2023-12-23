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
import { Town } from "@prisma/client";
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

type TownFormValue = z.infer<typeof formSchema>;

interface TownFormProps {
  initialData: Town | null;
}

const TownForm: React.FC<TownFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "چاکردن" : "درووستکردن";
  const description = initialData ? "چاککردنی قەزا" : "زیادکردن";
  const toastMessage = initialData ? "گۆڕانکاری" : "درووستکرا";
  const action = initialData ? "گۆڕانکاری" : "درووستکردن";

  const form = useForm<TownFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: TownFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/town/${params.townId}`, data);
      } else {
        await axios.post(`/api/town`, data);
      }
      router.push("/town");
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
      await axios.delete(`/api/town/${params.townId}`);
      router.push("/town");
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
                  <FormLabel>ناوی قەزا</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ناوی قەزا"
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

export default TownForm;
