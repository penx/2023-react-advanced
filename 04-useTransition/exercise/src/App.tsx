import { Fragment, memo, useEffect, useState, useTransition } from "react";
import { text } from "./text";

const BookText = ({ highlight }: { highlight: string }) => {
  if (highlight.length < 2) return <>{text}</>;

  const content = text.split(highlight).map((textEntry) => {
    return (
      <Fragment>
        {textEntry}
        <span style={{ background: "yellow" }}>{highlight}</span>
      </Fragment>
    );
  });

  return <>{content}</>;
};

const MemoedBookText = memo(BookText);

function App() {
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log(query);
  });

  return (
    <div>
      <input
        onChange={({ target }) => {
          setQuery(target.value);
          startTransition(() => {
            setQuery2(target.value);
          });
        }}
        value={query}
        type="text"
        style={{ fontSize: "3rem" }}
      />
      <br />
      <div
        style={{
          opacity: isPending ? 0.5 : 1,
          transitionProperty: "opacity",
          transitionDuration: isPending ? "300ms" : "100ms",
        }}
      >
        <MemoedBookText highlight={query2} />
      </div>
    </div>
  );
}

export default App;
