import React from 'react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from 'next-auth/react';
import { getUserInitials } from '@/lib/utils';

const ProfileMenu = () => {
  const {data: session} = useSession()
  const initials = getUserInitials(session?.user?.name)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.user?.image}
            alt="user_avatar"
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="focus:!bg-[unset] !cursor-text">
          {session?.user?.name}
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:!bg-[unset] !cursor-text">
          Address
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:!bg-[unset]">
          <Button variant="destructive" onClick={() => signOut()}>
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileMenu