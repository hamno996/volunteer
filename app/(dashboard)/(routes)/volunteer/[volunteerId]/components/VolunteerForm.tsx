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
import { City, Street, Town, Volunteer } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  imageUrl: z.string().min(10),
  name: z.string().min(1),
  gender: z.string().min(1),
  age: z.coerce.number().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().min(1),
  cityId: z.string().min(1),
  townId: z.string().min(1),
  streetId: z.string().min(1),
  dateOfGraduation: z.string().min(1),
  specialty: z.string().min(1),
  degree: z.string().min(1),
  code: z.string().min(1),
  dateOfServe: z.string().min(1),
  income: z.string().min(1),
  placeOfWork: z.string().min(1),
  member: z.string().min(1),
});

type VolunteerFormValue = z.infer<typeof formSchema>;

interface VolunteerFormProps {
  initialData: Volunteer | null;
  city: City[];
  town: Town[];
  street: Street[];
}

const CityForm: React.FC<VolunteerFormProps> = ({
  initialData,
  city,
  town,
  street,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "گۆڕانکاری" : "درووستکرن";
  const description = initialData ? "چاککردن" : "زیادکردن";
  const toastMessage = initialData ? "گۆڕانکاریکرا" : "درووستکرا";
  const action = initialData ? "گۆڕانکاری" : "درووستکرن";

  const form = useForm<VolunteerFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: "",
      name: "",
      gender: "",
      age: 0,
      phoneNumber: "",
      email: "",
      cityId: "",
      townId: "",
      streetId: "",
      dateOfGraduation: "",
      specialty: "",
      degree: "",
      code: "",
      dateOfServe: "",
      income: "",
      placeOfWork: "",
      member: "",
    },
  });

  const onSubmit = async (data: VolunteerFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/volunteer/${params.volunteerId}`, data);
      } else {
        await axios.post(`/api/volunteer`, data);
      }
      router.push("/volunteer");

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
      await axios.delete(`/api/volunteer/${params.volunteerId}`);
      router.push("/volunteer");
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>وێنەی کەسی</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ناوی خۆبەخش</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ناوی خۆبەخش"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ڕەگەز</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="دیاریکردنی ڕەگەز"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="male" value="نێر">
                        نێر
                      </SelectItem>
                      <SelectItem key="female" value="مێ">
                        مێ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تەمەن</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="تەمەن"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ژمارەی تەلەفۆن</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="ژمارەی تەلەفۆن"
                      {...field}
                    />
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
                  <FormLabel>ئیمەیڵ</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      placeholder="ئیمەیڵ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شار</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="دیاری کردنی شار"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {city.map((cities) => (
                        <SelectItem key={cities.id} value={cities.id}>
                          {cities.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="townId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>قەزا</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="دیاری کردنی قەزا"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {town.map((towns) => (
                        <SelectItem key={towns.id} value={towns.id}>
                          {towns.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>گەڕەک</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="دیاریکردنی گەڕەک"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {street.map((streets) => (
                        <SelectItem key={streets.id} value={streets.id}>
                          {streets.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfGraduation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ساڵی دەرچوون</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>پسپۆڕی</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="پسپۆڕی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>بڕوانەمە</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="دیاریکردنی بڕوانامە"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="diploma" value="دبلۆم">
                        دبلۆم
                      </SelectItem>
                      <SelectItem key="bachelor" value="بەکالریۆس">
                        بەکالریۆس
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کۆد</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="کۆد" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfServe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ساڵی خزمەت</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="ساڵی خزمەت"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سەرچاوەی داهات</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="سەرچاوەی داهات"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شوێنی کار</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="شوێنی کار"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ئەندام لە ڕێکخراو</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="ئەندام لە ڕێکخراو"
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

export default CityForm;
