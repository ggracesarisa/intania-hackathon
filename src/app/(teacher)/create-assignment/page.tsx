"use client";
import { Button } from "@/components/ui/button";
import { DatePickerWithPresets } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

const Page = () => {
  const [appTime, setAppTime] = useState<string>("");
  return (
    <main className="w-full max-w-sm px-3 sm:px-4">
      <section className="flex w-full flex-col">
        <h1 className="flex w-full space-x-3">
          <ArrowLeft />
          <span className="text-xl font-semibold">New Assignment</span>
        </h1>
        <Separator />
      </section>
      <section>
        <div className="space-y-1.5 p-1.5">
          <p>Assign to</p>
          <Input className="bg-white" placeholder="9xMa2" />
        </div>
        <div className="space-y-1.5 p-1.5">
          <p>Title</p>
          <Input className="bg-white" placeholder="Algebra Worksheets" />
        </div>
        <div className="space-y-1.5 p-1.5">
          <p>Instructions</p>
          <Input
            type="textarea"
            className="flex bg-white"
            placeholder="Enter Instructions"
          />
        </div>
        <div className="grid grid-cols-3 space-x-2">
          <div className="col-span-2">
            <p>Date Due</p>
            <DatePickerWithPresets />
          </div>
          <div className="col-span-1">
            <p>Date Due</p>
            <Select value={appTime} onValueChange={setAppTime}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-around py-3">
          <Button className="w-2/5 rounded-md" variant={"destructive"}>
            Discard
          </Button>
          <Button className="w-2/5 rounded-md" variant={"default"}>
            Continue
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Page;
