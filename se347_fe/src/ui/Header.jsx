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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/App";
import tokenHelper from "@/helper/tokenHelper";
import { useLogOut } from "@/api/data_hooks/authHook";
export function Header() {
  // open dropdown menu
  const [isOpen, setIsOpen] = useState();
  // context
  const appContext = useContext(AppContext);

  //logOut hook
  const logOut = useLogOut();

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

  // handle on select option menu
  function handleOnSelectOptionMenu(item) {
    if (item.id === optionsMenu.LOGOUT.id) {
      // logout
      logOut.mutate();
      appContext.setIsLogin(false);
      navigate("/login");
    } else if (item.id === optionsMenu.PROFILE.id) {
      console.log(item);
    }
  }

  // navigate
  const navigate = useNavigate();
  function openDropDown() {
    setIsOpen(true);
  }

  return (
    <header className="bg-card shadow-xl h-16 aspect-square flex items-center justify-between px-6 py-2">
      <div>
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-Poppins font-bold h-fit  bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent text-bla hover:cursor-pointer select-none"
        >
          MyQuizz
        </div>
      </div>

      {appContext.currentUserProfile && (
        <DropdownMenu className="h-full">
          <DropdownMenuTrigger
            onClick={function (e) {
              openDropDown();
            }}
          >
            <AvatarImage
              className="h-14 aspect-square"
              src={appContext.currentUserProfile.avatar}
              alt={appContext.currentUserProfile.firstName}
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
                    handleOnSelectOptionMenu(selectedItem);
                  }}
                >
                  {<item.icon className="w-4 h-4 me-2" />}
                  {item.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {appContext.currentUserProfile == null && (
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/login")}
          className="text-sm px-5 py-5 bg-accent-foreground text-white hover:bg-accent-foreground/70"
        >
          Đăng nhập
        </Button>
      )}
    </header>
  );
}
