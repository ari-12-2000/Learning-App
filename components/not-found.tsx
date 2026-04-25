"use client";

import { ArrowLeft, FileText, Users, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const NotFound = ({
  resource,
  message,
}: {
  resource: string;
  message?: string;
}) => {
  const router = useRouter();

  const iconMap = {
  coaches: Users,
  program: BookOpen,
  resource: FileText,
};

const Icon = iconMap[resource as keyof typeof iconMap] || FileText;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Icon className="h-8 w-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">
            {resource.charAt(0).toUpperCase() + resource.slice(1)} not found
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {message ??
              `We couldn't find the ${resource} you're looking for. ${resource.endsWith('s')?'They':'It'} may have been removed or the link might be incorrect.`}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center pt-2">

            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700"
            >
              Retry
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default NotFound;