"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Volunteer } from "@prisma/client";

interface VolunteerProps {
  volunteer: Volunteer[];
}

const Dashboard: React.FC<VolunteerProps> = ({ volunteer }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const maleVolunteers = volunteer.filter(
    (volunteer) => volunteer.gender === "نێر"
  );
  const femaleVolunteers = volunteer.filter(
    (volunteer) => volunteer.gender === "مێ"
  );

  return (
    <div className="container mx-atuo mt-5">
      <div className="grid xl:grid-cols-3 justify-center gap-y-12 xl:gap-y-24 xl:gap-x-8">
        <Card className="w-full max-w-[424px] flex flex-col pt-16 pb-10 justify-center">
          <CardContent>
            <CardTitle className="mb-4">خۆبەخشەکان</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              {volunteer.length}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full max-w-[424px] flex flex-col pt-16 pb-10 justify-center">
          <CardContent>
            <CardTitle className="mb-4">كۆی رەگەزی نێر</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              {maleVolunteers.length}
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="w-full max-w-[424px] flex flex-col pt-16 pb-10 justify-center">
          <CardContent>
            <CardTitle className="mb-4">کۆی رەگەزی مێ</CardTitle>
            <CardDescription className="text-3xl font-semibold">
              {femaleVolunteers.length}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
