// components/ui/dialog.jsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import "../../css/dialog.css";
import "../../css/global.css";

export function Dialog({  open, onOpenChange, children }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export function DialogContent({ children, size = "large" }) {
  const sizeClass = size === "small" ? "dialog-box-small" : "dialog-box"; //we'll have 2 types of box depending on the purpose for the app

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay" />
      <DialogPrimitive.Content className={sizeClass}>
        {children}
        <DialogClose asChild>
        <button className="close-button">×</button>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export const DialogClose = DialogPrimitive.Close;


