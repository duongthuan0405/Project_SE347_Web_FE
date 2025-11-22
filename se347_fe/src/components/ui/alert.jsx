import { CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const Alert = ({
  title,
  description,
  variant = "info",
  className,
  ...props
}) => {
  const Icon = icons[variant] || Info;
  return (
    <div
      className={cn("rounded-md p-4 flex items-start gap-3", className)}
      {...props}
    >
      <Icon className="h-5 w-5" />
      <div>
        {title && <div className="font-medium">{title}</div>}
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};

export default Alert;
