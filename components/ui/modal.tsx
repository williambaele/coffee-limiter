import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Modal = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="h-screen w-full relative inset-0">
        <div className="h-1/3 w-1/3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-md p-4">
          <p>hi</p>
        </div>
      </div>
    );
  }
);
Modal.displayName = "Input";

export { Modal };
