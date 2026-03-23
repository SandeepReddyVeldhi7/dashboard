"use client";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { useMemo, useEffect, useState } from "react";

export default function StyletronProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const engine = useMemo(() => (typeof window !== "undefined" ? new Styletron() : null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !engine) return null;

  return <StyletronProvider value={engine}>{children}</StyletronProvider>;
}
