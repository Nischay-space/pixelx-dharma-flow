
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => {
  return (
    <Card className="w-full bg-dharma-light-purple bg-opacity-70 hover:shadow-md transition-all duration-300 border-dharma-purple border-opacity-20">
      <CardContent className="p-6">
        <blockquote className="italic text-lg text-dharma-dark mb-4">
          "{quote}"
        </blockquote>
        <p className="text-right text-sm text-dharma-dark opacity-80">
          — {author}
        </p>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
