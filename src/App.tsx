import { useQuery } from "@tanstack/react-query";
import { QuoteContainer } from "./components/QuoteContainer";

interface Quote {
  content: string;
  author: string;
}

function App() {
  const getRandomQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    return response.json();
  };

  const { data, isLoading, refetch } = useQuery({
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
    };

    if (!quoteArray.map((q: Quote) => q.content).includes(newQuote.content)) {
      quoteArray.push(newQuote);
      localStorage.setItem("quotes", JSON.stringify(quoteArray));
    }
  };

  const displayFavorites = () => {};

  return (
    <div className="max-w-[600px] min-w-[400px] py-4 px-2 flex flex-col justify-center mx-auto">
      <button
        onClick={() => refetch()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get a new quote
      </button>
      <h1 className="text-center p-4 text-2xl">Your quote for today:</h1>
      {isLoading ? (
        <p className="text-center">Please wait...</p>
      ) : (
        <QuoteContainer content={data.content} author={data.author} />
      )}
      <div className="flex justify-center w-full mt-4 gap-4">
        <button
          onClick={addToFavorites}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to favorites
        </button>
        <button
          onClick={displayFavorites}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Display favorites
        </button>
      </div>
    </div>
  );
}

export default App;
