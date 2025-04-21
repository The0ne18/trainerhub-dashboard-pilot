
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Timer, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

// Days of the week for repetition
const weekDays = [
  { label: "Sun", value: 0 },
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
];

// Mock data, in real app would come from API
const clients = [
  { id: 1, name: "Emma Thompson" },
  { id: 2, name: "Michael Chen" },
  { id: 3, name: "Sarah Johnson" }
];
const sessionTypes = [
  "Strength Training",
  "Cardio",
  "HIIT",
  "Flexibility",
  "Mobility",
];

interface SessionForm {
  clientId: number | "";
  type: string;
  date: Date | null;
  time: string;
  duration: number | "";
  notes: string;
  repeat: boolean;
  repeatDays: number[];
  repeatWeeks: number | "";
}

export function ScheduleSessionDialog() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<SessionForm>({
    defaultValues: {
      clientId: "",
      type: "",
      date: null,
      time: "",
      duration: "",
      notes: "",
      repeat: false,
      repeatDays: [],
      repeatWeeks: "",
    },
  });

  const repeat = form.watch("repeat");
  const repeatDays = form.watch("repeatDays");

  function handleSubmit(data: SessionForm) {
    setOpen(false);
    setTimeout(() => {
      window.alert("Session scheduled!\n" + JSON.stringify(data, null, 2));
    }, 10);
    form.reset();
  }

  // Helper for toggling days in repeatDays
  function toggleRepeatDay(day: number) {
    const current = form.getValues("repeatDays") || [];
    if (current.includes(day)) {
      form.setValue("repeatDays", current.filter((d) => d !== day));
    } else {
      form.setValue("repeatDays", [...current, day]);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full animate-fade-in">
        <DialogHeader>
          <DialogTitle>Schedule Training Session</DialogTitle>
          <DialogDescription>
            Create a new training session for your client.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
            autoComplete="off"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="clientId"
                rules={{ required: "Select client" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className={cn(
                          "w-full border border-input rounded-md h-10 px-3 bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <option value="">Select client</option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                rules={{ required: "Select session type" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Session Type</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className={cn(
                          "w-full border border-input rounded-md h-10 px-3 bg-background text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <option value="">Select type</option>
                        {sessionTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="date"
                rules={{ required: "Pick a date" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal flex items-center",
                          !field.value && "text-muted-foreground"
                        )}
                        onClick={() => {}}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                rules={{ required: "Time required" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      Time
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="duration"
                rules={{ required: "Duration required", min: { value: 1, message: "Min 1 min" } }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>
                      <span className="flex items-center">
                        <Timer className="mr-1 h-4 w-4" />
                        Duration (min)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g., bring resistance bands"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Repeat Session Toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                id="repeat-toggle"
                type="checkbox"
                checked={repeat}
                onChange={() => form.setValue("repeat", !repeat)}
                className="peer accent-trainer-purple mr-2 h-4 w-4"
              />
              <label htmlFor="repeat-toggle" className="font-medium flex items-center select-none cursor-pointer">
                <Repeat className="h-4 w-4 mr-1" />
                Repeat Session
              </label>
            </div>

            {/* Repeat options - only shown if repeat is checked */}
            {repeat && (
              <div className="space-y-4 rounded-lg border border-muted p-3 bg-purple-50">
                <div>
                  <span className="block font-medium text-sm mb-2">Repeat on:</span>
                  <div className="flex justify-between flex-wrap gap-2">
                    {weekDays.map((day) => (
                      <button
                        type="button"
                        key={day.value}
                        className={cn(
                          "px-2 py-1 rounded-md text-sm font-semibold border",
                          repeatDays.includes(day.value)
                            ? "bg-trainer-purple text-white border-trainer-purple"
                            : "bg-white text-trainer-purple border-trainer-purple opacity-60",
                          "transition-colors w-10 focus:outline-none"
                        )}
                        onClick={() => toggleRepeatDay(day.value)}
                        tabIndex={0}
                        aria-pressed={repeatDays.includes(day.value)}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="repeatWeeks"
                  rules={{
                    required: "How many weeks?",
                    min: { value: 1, message: "At least 1 week" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat for (weeks)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-xs text-muted-foreground">
                  The session will repeat on the selected days, starting from the chosen date, for the specified number of weeks.
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="submit" className="w-full md:w-auto">
                Schedule
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleSessionDialog;
