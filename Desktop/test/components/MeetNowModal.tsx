"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Video, Copy, X, Check } from "lucide-react";
import { useState } from "react";

interface MeetNowModalProps {
  open: boolean;
  onClose: () => void;
}

const MEETING_LINK = "https://teams.live.com/meet/9876543210";

export default function MeetNowModal({ open, onClose }: MeetNowModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(MEETING_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm">
          <div className="bg-app-panel border border-app-border rounded-2xl shadow-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand to-[#7c3aed]" />
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-base font-bold text-text-primary flex items-center gap-2">
                  <Video size={18} className="text-brand" />
                  Meet Now
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-state-hover text-text-muted hover:text-text-primary transition"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="text-sm text-text-secondary mb-4">
                Start an instant meeting and share the link with anyone.
              </p>

              {/* Meeting link */}
              <div className="flex items-center gap-2 bg-app-bg border border-app-border rounded-lg px-3 py-2 mb-4">
                <span className="flex-1 text-xs text-text-muted truncate">{MEETING_LINK}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 rounded hover:bg-state-hover text-text-muted hover:text-brand transition flex-shrink-0"
                  title="Copy link"
                >
                  {copied ? <Check size={14} className="text-brand" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 px-4 py-2 rounded-lg border border-app-border text-sm font-medium text-text-secondary hover:bg-state-hover hover:text-text-primary transition flex items-center justify-center gap-1.5"
                >
                  <Copy size={14} />
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <button
                  onClick={() => window.open(MEETING_LINK, "_blank")}
                  className="flex-1 px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-sm font-medium transition flex items-center justify-center gap-1.5"
                >
                  <Video size={14} />
                  Join now
                </button>
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
