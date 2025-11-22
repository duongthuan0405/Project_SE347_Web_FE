import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState();

  function openDropDown() {
    setIsOpen(true);
  }

  const optionsMenu = {
    PROFILE: {
      id: 0,
      name: "Hồ sơ",
      icon: User,
    },

    LOGOUT: {
      id: 1,
      name: "Đăng xuất",
      icon: LogOut,
    },

    asArray() {
      return Object.values(this).filter((prop) => typeof prop !== "function");
    },
  };

  return (
    <header className="bg-card shadow-xl h-16 aspect-square flex items-center justify-between px-6 py-2">
      <div>
        <h1 className="text-xl font-Poppins font-bold h-fit mb-4 bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent text-bla">
          MyQuizz
        </h1>
      </div>
      <DropdownMenu className="h-full">
        <DropdownMenuTrigger
          onClick={function (e) {
            openDropDown();
          }}
        >
          <AvatarImage
            className="h-15 aspect-square"
            src="https://scontent.fhan4-6.fna.fbcdn.net/v/t39.30808-6/584165360_841893141897615_6758666652772022466_n.jpg?stp=cp6_dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH9zo52Ho1npzS-JIx1ykf2ei0O7Xaf5sR6LQ7tdp_mxIJ2jlbhzpSTw-7n3rfTX-aBMPWO1fsZYoxLb7fgHZNW&_nc_ohc=G1BYvaMvWfoQ7kNvwGzCxdl&_nc_oc=AdnfmQwYS52tzvqtsEW34hiL_e-gh-E9ZEY1yu6tld8HytkbXN3W1-LHny3nGkLYZNE&_nc_zt=23&_nc_ht=scontent.fhan4-6.fna&_nc_gid=yE0t5GTtnaPvnnglvux7rQ&oh=00_AfgJShrcPvKiFvDB01cMD-mFTxhV0aTKl_w93-yRih-sRA&oe=69265DD6"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 right-2"
          open={isOpen}
          setOpen={setIsOpen}
        >
          <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {optionsMenu.asArray().map(function (item, index) {
            return (
              <DropdownMenuItem
                key={item.id}
                item={item}
                onSelect={function (selectedItem) {
                  if (selectedItem === null) {
                    selectedItem = item;
                  }
                  console.log(selectedItem);
                }}
              >
                {<item.icon className="w-4 h-4 me-2" />}
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
