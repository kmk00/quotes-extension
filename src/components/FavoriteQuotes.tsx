import { useState } from "react";
import { Quote } from "../Quote.types";
export const FavoriteQuotes = ({ quotes }: { quotes: Quote[] }) => {
  const [quotesList, setQuotesList] = useState(quotes);

  const removeQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newQuotes = quotesList.filter(
      (q: Quote) => q.id !== e.currentTarget.value
    );
    setQuotesList(newQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotesList));
  };

  return (
    <div className="border-t-2 border-blue-400 py-2 max-h-[400px] overflow-y-auto">
      <div className="px-2 mt-2">
        {quotesList.map((q: Quote) => (
          <p className="mt-2" key={q.id}>
            {q.content} ~ {q.author}{" "}
            <button
              type="button"
              value={q.id}
              onClick={removeQuote}
              className="mr-2 text-red-500"
            >
              X
            </button>
          </p>
        ))}
        {quotesList.length === 0 && (
          <p className="mt-2 text-center">No favorite quotes</p>
        )}
      </div>
    </div>
  );
};
