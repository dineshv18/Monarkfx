import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  coursePrice: number;
  onPurchaseSuccess?: () => void;
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({
  isOpen,
  onClose,
  courseSlug,
  coursePrice,
  onPurchaseSuccess,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      router.push(`/buy?course-slug=${courseSlug}`);
      onPurchaseSuccess?.();
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-[#E8E8E8] rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-[#1A1A1A]">Purchase Required</DialogTitle>
          <DialogDescription className="text-[#4A4A4A]">
            This content is part of a paid course. To access it, you need to
            purchase the course.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="p-4 bg-[#FBF6E9] rounded-[12px]">
            <p className="text-lg font-semibold text-[#E8B923] font-mono-data">
              Course Price: ${coursePrice.toLocaleString("en-IN")}
            </p>
          </div>

          <ul className="space-y-2 text-sm text-[#4A4A4A]">
            <li className="flex items-center gap-2">✓ Lifetime access</li>
            <li className="flex items-center gap-2">✓ All chapters included</li>
            <li className="flex items-center gap-2">
              ✓ Certificate of completion
            </li>
          </ul>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={handlePurchase} disabled={isLoading} className="bg-[image:var(--gold-metallic)] hover:brightness-95 text-[#0B1E3F] rounded-[12px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Purchase Course"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
