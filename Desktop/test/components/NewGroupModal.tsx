"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X, Edit2, Shield, Users } from "lucide-react";
import { useState } from "react";

interface NewGroupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NewGroupModal({ open, onClose }: NewGroupModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    // creating group is simulated here
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/60 z-50 transition-opacity" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[800px] bg-[#292929] shadow-2xl rounded-lg overflow-hidden flex flex-col border border-[#3d3d3d]">
          
          <div className="flex h-[450px]">
            {/* Left Header & Illustration */}
            <div className="w-[300px] bg-[#242424] p-8 flex flex-col justify-between shrink-0">
              <div>
                <h2 className="text-2xl text-white font-semibold mb-6">New group</h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Working together on a project or a shared goal? Create a group to give your team a space for conversations, shared files, scheduling events and more.
                </p>
              </div>
              
              {/* Illustration Placeholder */}
              <div className="relative w-40 h-40 self-center opacity-90">
                <div className="absolute top-4 left-0 w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center">
                  <span className="text-4xl text-blue-400">🙋‍♀️</span>
                </div>
                <div className="absolute bottom-4 right-0 w-24 h-24 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center">
                  <span className="text-4xl text-pink-400">🙋‍♂️</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 p-8 flex flex-col bg-[#292929]">
              
              <div className="space-y-6 flex-1">
                {/* Name */}
                <div>
                  <label className="block text-sm text-text-secondary mb-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-[#5b5fc7] rounded px-3 py-2 text-white outline-none focus:ring-1 focus:ring-[#5b5fc7] transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell people the purpose of your group"
                    rows={4}
                    className="w-full bg-transparent border border-[#4a4a4a] rounded px-3 py-2 text-white placeholder-text-muted outline-none focus:border-[#5b5fc7] focus:ring-1 focus:ring-[#5b5fc7] transition resize-none"
                  />
                </div>

                {/* Default settings */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-white">Default settings</h3>
                    <button className="flex items-center gap-1.5 text-[#8e8cd8] hover:text-[#a6a4e2] text-sm transition">
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  
                  <div className="space-y-3 text-sm text-text-secondary">
                    <p>Privacy: <span className="text-white">Private</span></p>
                    <p>Language for group related notifications: <span className="text-white">English (US)</span></p>
                    <p>Subscription: <span className="text-white">Members will receive all group conversations and events in their inboxes.</span></p>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={handleCreate}
                  disabled={!name.trim()}
                  className="px-5 py-2 bg-[#5b5fc7] hover:bg-[#4f52b2] text-white text-sm font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Create
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-transparent border border-[#4a4a4a] text-white hover:bg-[#333333] text-sm font-semibold rounded transition"
                >
                  Discard
                </button>
              </div>

            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
