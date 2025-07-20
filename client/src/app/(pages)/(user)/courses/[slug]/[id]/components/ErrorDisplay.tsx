import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-black to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/10 to-red-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-zinc-700/50 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </CardTitle>
            <p className="text-zinc-300 text-sm">
              We encountered an error while loading your course
            </p>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={onRetry}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="flex-1 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 hover:border-green-500/50 text-zinc-300 hover:text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>

                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/courses")}
                  className="flex-1 bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 hover:border-green-500/50 text-zinc-300 hover:text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Courses
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-zinc-500">
                If the problem persists, please contact our support team
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
