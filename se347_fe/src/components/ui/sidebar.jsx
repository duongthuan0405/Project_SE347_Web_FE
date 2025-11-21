import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = ({ items = [] }) => {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-4">
        <div className="text-xl font-semibold">MyQuizz</div>
      </div>
      <nav className="px-2 py-4">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent",
                item.className
              )}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
