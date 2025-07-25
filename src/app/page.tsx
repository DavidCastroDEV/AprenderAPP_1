"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { regenerateWelcomeMessage } from "@/ai/flows/regenerate-welcome-message";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to Frontend Flipper!"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const result = await regenerateWelcomeMessage({
        currentMessage: welcomeMessage,
      });
      setWelcomeMessage(result.newMessage);
    } catch (error) {
      console.error("Failed to regenerate message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate a new message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight text-primary">
          Frontend Flipper
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-12">
          {welcomeMessage}
        </p>
        <div className="flex justify-center items-center gap-4">
          <ThemeToggle />
          <Button
            onClick={handleRegenerate}
            disabled={isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Regenerate Message
          </Button>
        </div>
      </div>
    </main>
  );
}
