"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { FlowchartNode } from "@/data/flowchart";
import { Button } from "@/components/ui/button";

const FOCUSABLE =
  'a[href], button, textarea, input, select, details,[tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      !element.getAttribute("aria-hidden") &&
      element.tabIndex !== -1
  );
}

type NodeDrawerProps = {
  open: boolean;
  node?: FlowchartNode;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: () => void;
};

export function NodeDrawer({ open, node, isCompleted, onClose, onToggleComplete }: NodeDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!drawerRef.current) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(drawerRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !drawerRef.current) {
      return;
    }
    const focusable = getFocusableElements(drawerRef.current);
    (focusable[0] ?? drawerRef.current).focus();
  }, [open]);

  if (!open || !node) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
        data-testid="drawer-overlay"
      />
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-drawer-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col gap-6 border-l border-border bg-background p-6 shadow-xl transition-transform duration-200 ease-out"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Step</p>
            <h2 id="node-drawer-title" className="text-2xl font-semibold">
              {node.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2.5 py-2 text-sm font-medium shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Close
          </button>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{node.summary}</p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Helpful links</p>
          <ul className="space-y-2">
            {node.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-primary underline underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button type="button" variant={isCompleted ? "secondary" : "default"} onClick={onToggleComplete}>
            {isCompleted ? "Mark as incomplete" : "Mark complete"}
          </Button>
          {isCompleted ? (
            <p className="text-xs text-emerald-700">Progress saved for this session.</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Marking complete only lasts until you refresh this page.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}

export default NodeDrawer;
