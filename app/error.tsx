'use client';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Alert variant="destructive" className="max-w-xl w-full shadow-lg">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <div>
            <AlertTitle className="text-lg font-semibold">Something went wrong</AlertTitle>
            <AlertDescription className="mt-1 text-sm text-muted-foreground">
              {"An unexpected error occurred. Please try again later or contact the administrator."}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
