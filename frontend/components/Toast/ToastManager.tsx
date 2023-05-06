import React, { useEffect } from "react";
import Toast, { ToastProps } from "./Toast";
import { createRoot } from "react-dom/client";

interface ToastOptions {
  id?: string;
  title?: string;
  content?: string;
  duration?: number;

  position?: string;
  type?: string;
  isDarkMode?: boolean;
}

export class ToastManager {
  private containerRef: HTMLDivElement;
  private toasts: ToastProps[] = [];
  private toastRoot: any = null;

  // constructor() {
  //     const body = document.getElementsByTagName(
  //         "body"
  //     )[0] as HTMLBodyElement  ;
  //     const toastContainer = document.createElement("div") as HTMLDivElement;
  //     toastContainer.id = "toast-container-main";
  //     body.insertAdjacentElement("beforeend", toastContainer);
  //     this.containerRef = toastContainer;
  // }

  getRoot() {
    if (this.toastRoot == null) {
      this.toastRoot = createRoot(this.containerRef);
    }
    return this.toastRoot;
  }
  public show(options: ToastOptions): void {
    const toastId = Math.random().toString(36).substr(2, 9);
    const toast: ToastProps = {
      id: toastId,
      ...options, // if id is passed within options, it will overwrite the auto-generated one
      destroy: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps) => (
      <Toast key={toastProps.id} {...toastProps} />
    ));

    this.getRoot().render(toastsList);
  }
}

export const toast = new ToastManager();
