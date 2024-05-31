"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailedUser } from "@/types/types";
import { makeVehicleTitle } from "@/lib/utils";
import { AddVehicleForm } from "./AddVehicleForm";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDialog } from "../ui/use-dialog";
import { toast } from "@/components/ui/use-toast";
import { addSubscription } from "@/actions/subscriptions";
import { Car } from "lucide-react";

const formSchema = z.object({
  subscriptionType: z.string(),
  vehicleId: z.string(),
});

export function AddSubScriptionForm({
  user,
  onSuccess,
}: {
  user: DetailedUser;
  onSuccess: () => void;
}) {
  const [newVehicleIdString, setNewVehicleIdString] = useState<string>("");
  const addVehicleDialog = useDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionType: "",
      vehicleId: newVehicleIdString,
    },
  });

  useEffect(() => {
    form.setValue("vehicleId", newVehicleIdString);
  }, [newVehicleIdString, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const subscriptionType = values.subscriptionType;
    const vehicleId = parseInt(values.vehicleId);

    const subscriptionData = { subscriptionType, vehicleId, userId: user.id };
    const response = await addSubscription(subscriptionData);
    if (response.status === "success") {
      toast({
        variant: "success",
        title: "Success!",
        description: response.message,
      });
      onSuccess();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: (
          <pre className="mt-2 w-[400px] rounded-md bg-red-700">
            <p className="text-white">{response.message}</p>
          </pre>
        ),
      });
      form.reset();
    }
  }

  const handleNewlyAddedVehicle = (newId?: number) => {
    setNewVehicleIdString(newId!.toString());
    addVehicleDialog.dismiss();
  };
  console.log("form values before:", form.getValues());
  return (
    <div>
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="subscriptionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription plan</FormLabel>
                <FormDescription>
                  Please select the type of subscription.
                </FormDescription>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select vehicle:</FormLabel>
                <FormDescription>
                  Choose which vehicle the subscription should be applied to.
                </FormDescription>
                {user.vehicles.length > 1 ? (
                  <Select
                    value={newVehicleIdString}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user.vehicles.map((vehicle) => (
                        <SelectItem
                          value={vehicle.id.toString()}
                          key={vehicle.id}
                        >
                          {makeVehicleTitle(vehicle)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-red-500">
                    User only has one vehicle. Please another vehicle to
                    transfer.
                  </p>
                )}

                <Button
                  variant="secondary"
                  onClick={addVehicleDialog.trigger}
                  className="flex justify-start font-bold hover:font-extrabold"
                  type="button"
                >
                  <Car className="mr-2 h-4 w-4" />
                  Add new vehicle
                </Button>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Dialog {...addVehicleDialog.props}>
        <DialogContent>
          <AddVehicleForm
            userId={user.id}
            onSuccess={handleNewlyAddedVehicle}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
