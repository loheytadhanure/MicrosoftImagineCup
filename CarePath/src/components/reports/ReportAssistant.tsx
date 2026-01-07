import { useState } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { CareCard, CareCardHeader, CareCardTitle, CareCardContent } from "@/components/ui/CareCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { mockChatMessages, mockAIResponses } from "@/data/mockData";
import type { ChatMessage } from "@/types";

interface ReportAssistantProps {
  className?: string;
}

export function ReportAssistant({ className }: ReportAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Find a matching response or use default
    const inputLower = input.toLowerCase();
    let responseText = mockAIResponses.default;
    
    for (const [key, value] of Object.entries(mockAIResponses)) {
      if (key !== 'default' && inputLower.includes(key)) {
        responseText = value;
        break;
      }
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What does HbA1c mean?",
    "Is my hemoglobin low?",
    "What is normal blood pressure?"
  ];

  return (
    <CareCard className={cn("flex flex-col", className)}>
      <CareCardHeader>
        <CareCardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Report Assistant
        </CareCardTitle>
      </CareCardHeader>
      
      <CareCardContent className="flex-1 flex flex-col">
        {/* Disclaimer */}
        <Disclaimer className="mb-4">
          For understanding only — not a diagnosis. Always consult your healthcare provider for medical advice.
        </Disclaimer>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-4 max-h-[300px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === 'assistant' 
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className={cn(
                "rounded-2xl px-4 py-3 max-w-[80%]",
                message.role === 'assistant'
                  ? "bg-care-surface text-foreground"
                  : "bg-primary text-primary-foreground"
              )}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary-light text-primary hover:bg-primary/20 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your reports..."
            className="care-input flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="bg-primary hover:bg-primary/90 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CareCardContent>
    </CareCard>
  );
}

