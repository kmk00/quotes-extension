import { Quote } from "../Quote.types";

export const QuoteContainer = ({ content, author }: Quote) => {
  return (
    <div className="text-xl py-4">
      <p className="text-center font-bold">{content}</p>
      <p className="text-right pr-8 text-md">~ {author}</p>
    </div>
  );
};
