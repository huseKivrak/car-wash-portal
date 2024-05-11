"use client";

import { AutoComplete, type Option } from "./ui/autocomplete";
import { useState, useEffect } from "react";
import { DetailedUser } from "@/types/types";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { KeyCombo, Keys, ShortcutsProvider } from "@/lib/keyboardShortcuts";
export function UsersAutocomplete({
  users,
  className,
}: {
  users: DetailedUser[];
  className?: string;
}) {
  console.log("users:", users);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [value, setValue] = useState<Option>();
  const router = useRouter();

  const options: Option[] = users.map((user) => ({
    value: user.id.toString(),
    label: user.name,
    id: user.id.toString(),
  }));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        // && event.shiftKey
        value
      ) {
        router.push(`/users/${value.value}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [value, router]);

  return (
    <div className={cn("not-prose flex w-full rounded-lg p-4", className)}>
      <AutoComplete
        options={options}
        emptyMessage="No users found."
        placeholder="Search..."
        isLoading={isLoading}
        onValueChange={setValue}
        value={value}
        disabled={isDisabled}
      />
      {/* {value && (
				<div className='flex items-center gap-4'>
					<Link
						href={`/users/${value.value}`}
						className={cn(buttonVariants({ size: 'sm', variant: 'default' }))}
					>
						View user
					</Link>
					<div className='flex gap-1'>
						<ShortcutsProvider>
							<KeyCombo keyNames={[Keys.Shift, Keys.Enter]} />
						</ShortcutsProvider>
					</div>
				</div>
			)} */}
    </div>
  );
}
