interface Quote {
  content: string;
  author: string;
}

export const QuoteContainer = ({ content, author }: Quote) => {
  return (
    <div className="text-xl">
      <p className="text-center">{content}</p>
      <p className="text-right pr-8">~ {author}</p>
    </div>
  );
};
