"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="px-4 pt-4">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          <div className="px-4 pb-6 overflow-y-auto">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto ${className ?? ""}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="pt-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};