"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User as UserIcon, Loader2, AlertTriangle, Sparkles } from "lucide-react";
import { getAIHealthAdviceAction } from "@/app/ai-assistant/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const aiAssistantSchema = z.object({
  query: z.string().min(10, { message: "Please enter a query of at least 10 characters." }).max(500, { message: "Query too long." }),
});

type AiAssistantFormValues = z.infer<typeof aiAssistantSchema>;

interface Message {
  id: string;
  type: "user" | "ai" | "error";
  text: string;
}

export default function AiAssistantClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AiAssistantFormValues>({
    resolver: zodResolver(aiAssistantSchema),
  });

  const onSubmit: SubmitHandler<AiAssistantFormValues> = async (data) => {
    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), type: "user", text: data.query };
    setMessages(prev => [...prev, userMessage]);
    reset();

    try {
      const result = await getAIHealthAdviceAction({ query: data.query });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), type: "ai", text: result.answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), type: "error", text: "An unexpected error occurred. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
      console.error("AI Assistant error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl flex flex-col h-[70vh]">
      <CardHeader className="text-center border-b">
         <Sparkles className="mx-auto h-10 w-10 text-primary mb-2" />
        <CardTitle className="text-2xl">AI Health Assistant</CardTitle>
        <CardDescription>Ask your health-related questions. This is not a substitute for professional medical advice.</CardDescription>
      </CardHeader>
      
      <ScrollArea className="flex-grow p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.type === "user" ? "justify-end" : ""}`}>
            {msg.type === "ai" && (
              <Avatar className="h-8 w-8 border border-primary/50">
                <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
              </Avatar>
            )}
             {msg.type === "error" && (
              <Avatar className="h-8 w-8 border border-destructive/50">
                <AvatarFallback><AlertTriangle className="h-5 w-5 text-destructive" /></AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] p-3 rounded-lg ${
              msg.type === "user" ? "bg-primary text-primary-foreground self-end" : 
              msg.type === "ai" ? "bg-muted" : 
              "bg-destructive/10 text-destructive"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.type === "user" && (
              <Avatar className="h-8 w-8 border">
                <AvatarFallback><UserIcon className="h-5 w-5" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            <Bot className="h-12 w-12 mx-auto mb-4" />
            <p>Ask me anything about your health or medications.</p>
            <p className="text-xs mt-1">(e.g., "What are common side effects of Paracetamol?")</p>
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea 
            id="query" 
            placeholder="Type your health question here..." 
            {...register("query")}
            className="flex-grow resize-none"
            rows={2}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="self-end h-auto py-2.5">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
          </Button>
        </div>
        {errors.query && <p className="text-sm text-destructive mt-1">{errors.query.message}</p>}
      </form>
    </Card>
  );
}
