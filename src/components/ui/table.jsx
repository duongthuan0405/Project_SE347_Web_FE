import React from "react";
import { cn } from "@/lib/utils";

const Table = ({ className, ...props }) => (
  <table className={cn("w-full text-sm", className)} {...props} />
);

const TableHeader = ({ className, ...props }) => (
  <thead className={cn("bg-muted", className)} {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody className={cn("", className)} {...props} />
);

const TableRow = ({ className, ...props }) => (
  <tr className={cn("border-b", className)} {...props} />
);

const TableCell = ({ className, ...props }) => (
  <td className={cn("px-4 py-2", className)} {...props} />
);

export { Table, TableHeader, TableBody, TableRow, TableCell };
