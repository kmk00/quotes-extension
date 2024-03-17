import { useQuery } from "@tanstack/react-query";
import { QuoteContainer } from "./components/QuoteContainer";
import { useState } from "react";
import { FavoriteQuotes } from "./components/FavoriteQuotes";

interface Quote {
  content: string;
  author: string;
  id: string;
}

function App() {
  const [displayList, setDisplayList] = useState(false);
  const [isAddedInfo, setIsAddedInfo] = useState(false);

  const getRandomQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    return response.json();
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: getRandomQuote,
    refetchOnWindowFocus: false,
  });

  const addToFavorites = () => {
    let quoteArray = [];

    if (localStorage.getItem("quotes")) {
      quoteArray = JSON.parse(localStorage.getItem("quotes") || "");
    }

    const newQuote: Quote = {
      content: data.content,
      author: data.author,
      id: data._id,
    };

    if (!quoteArray.map((q: Quote) => q.id).includes(newQuote.id)) {
      quoteArray.unshift(newQuote);
      localStorage.setItem("quotes", JSON.stringify(quoteArray));
    }

    setIsAddedInfo(true);
    setTimeout(() => {
      setIsAddedInfo(false);
    }, 2000);
  };

  const displayFavorites = () => {
    setDisplayList(!displayList);
    setIsAddedInfo(false);
  };

  const handleGetNewQuote = () => {
    refetch();
    setDisplayList(false);
  };

  const getFavoriteQuotes = () => {
    if (localStorage.getItem("quotes")) {
      return JSON.parse(localStorage.getItem("quotes") || "");
    }

    return [];
  };

  return (
    <div className="max-w-[600px] min-w-[400px] py-4 px-2 flex flex-col justify-center mx-auto">
      <button
        onClick={handleGetNewQuote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get a new quote
      </button>
      {isPending ? (
        <p className="text-center">Please wait...</p>
      ) : (
        <div>
          {displayList ? (
            <FavoriteQuotes quotes={getFavoriteQuotes()} />
          ) : (
            <QuoteContainer
              id={data._id}
              content={data.content}
              author={data.author}
            />
          )}
        </div>
      )}
      <div className="flex justify-center w-full mt-4 gap-4">
        {!displayList && (
          <button
            onClick={addToFavorites}
            disabled={isAddedInfo}
            className={` ${
              isAddedInfo ? "bg-blue-800" : "bg-blue-500"
            } w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          >
            <span>{isAddedInfo ? "Quote added" : "Add to favorites"}</span>
          </button>
        )}
        <button
          onClick={displayFavorites}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {displayList ? "Hide favorites" : "Show favorites"}
        </button>
      </div>
    </div>
  );
}

export default App;
