import { Toaster as SonnerToaster } from "sonner";

export function Sonner({ position = "top-center" }: { position?: string }) {
  return <SonnerToaster position={position as any} />;
}

export { toast } from "sonner";

