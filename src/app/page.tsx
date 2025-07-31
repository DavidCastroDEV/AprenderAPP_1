"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Aquí puedes agregar o cambiar tus frases
const welcomeMessages = [
  "Welcome to Frontend Flipper_2!",
  "Discover a new look with every click.",
  "Your interface, reimagined.",
  "Hello, world! Ready for a change?",
  "Press the button to see the magic."
];

export default function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState(welcomeMessages[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRegenerate = () => {
    // Lógica para seleccionar un mensaje aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    let newMessage = welcomeMessages[randomIndex];

    // Asegurarnos de que no se repita el mismo mensaje
    if (newMessage === welcomeMessage) {
      newMessage = welcomeMessages[(randomIndex + 1) % welcomeMessages.length];
    }
    
    setWelcomeMessage(newMessage);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight text-primary">
          Frontend Flipper_2
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
