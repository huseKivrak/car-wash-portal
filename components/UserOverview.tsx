"use client";

import { ArrowRightLeft, FilePlus, UserX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { DetailedUser } from "@/types/types";
import { LucidePhone, Mail } from "lucide-react";
import { useDialog } from "./ui/use-dialog";
import { DeleteModal } from "./DeleteModal";
import { cancelUser } from "@/actions/users";
import { Dialog, DialogContent } from "./ui/dialog";
import { TransferSubscriptionForm } from "./forms/TransferSubscriptionForm";
import { formatDateTime } from "@/lib/utils";
import { UserForm } from "./forms/UserForm";
import { UserActionsMenu } from "./table/ActionMenus";
import { AddSubScriptionForm } from "./forms/AddSubscriptionForm";

export function UserOverview({
  user,
  className,
}: {
  user: DetailedUser;
  className?: string;
}) {
  const cancelDialog = useDialog();
  const editDialog = useDialog();
  const transferSubscriptionDialog = useDialog();
  const addSubscriptionDialog = useDialog();
  return (
    <Card className="space-y-4 rounded-xl border-2">
      <CardHeader className="flex flex-row items-start bg-muted/50 ">
        <div className="grid gap-0.5">
          <CardTitle className="text-lg tracking-wider">{user.name}</CardTitle>
          <CardDescription className="mt-0 tracking-tight">
            <div className="space-y-1 text-stone-400 ">
              <div className="hover:underline">
                <Link href={`tel:${user.phone}`} className="flex items-center">
                  {user.phone}
                  <LucidePhone className="ml-2 h-3 w-3" />
                </Link>
              </div>
              <div className="hover:underline">
                <Link
                  href={`mailto:${user.email}`}
                  className="flex items-center text-sm"
                >
                  {user.email}
                  <Mail className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>
          </CardDescription>
        </div>
        <UserActionsMenu user={user} />
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-semibold"></div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={editDialog.trigger}
            className="bg-secondary"
          >
            <UserX className="mr-2 h-4 w-4" />
            Edit account
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={addSubscriptionDialog.trigger}
            className="bg-accent"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add subscription
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={transferSubscriptionDialog.trigger}
            className="bg-primary "
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Transfer Sub
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={cancelDialog.trigger}
            className="text-white"
          >
            <UserX className="mr-2 h-4 w-4" />
            Cancel account
          </Button>
        </div>

        <Dialog {...transferSubscriptionDialog.props}>
          <DialogContent>
            <TransferSubscriptionForm
              user={user}
              onSuccess={transferSubscriptionDialog.dismiss}
            />
          </DialogContent>
        </Dialog>

        <Dialog {...addSubscriptionDialog.props}>
          <DialogContent>
            <AddSubScriptionForm
              user={user}
              onSuccess={addSubscriptionDialog.dismiss}
            />
          </DialogContent>
        </Dialog>

        <Dialog {...cancelDialog.props}>
          <DialogContent>
            <DeleteModal
              deleteAction={cancelUser}
              id={user.id}
              dialogControl={cancelDialog}
            />
          </DialogContent>
        </Dialog>
        <Dialog {...editDialog.props}>
          <DialogContent>
            <UserForm user={user} onSuccess={editDialog.dismiss} />
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Last updated:{" "}
          <time dateTime={user.updatedAt.toString()}>
            {formatDateTime(user.updatedAt)}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
