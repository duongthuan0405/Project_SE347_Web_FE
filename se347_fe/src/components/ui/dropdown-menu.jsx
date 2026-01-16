import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Nếu bạn muốn dùng tiện ích className

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children, onClick }) {
  return (
    <button onClick={onClick} className="rounded-md focus:outline-none">
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, open, setOpen, className }) {
  const ref = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 min-w-32 overflow-hidden rounded-md border bg-white p-1 text-gray-800 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onSelect, className, item }) {
  return (
    <div
      onClick={(e) => onSelect(item)}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1 text-sm hover:bg-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className }) {
  return (
    <div className={cn("px-2 py-1 text-sm text-gray-500", className)}>
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }) {
  return <hr className={cn("my-1 border-t border-gray-200", className)} />;
}
