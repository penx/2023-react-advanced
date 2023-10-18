import { Fragment, memo, useEffect, useState, useTransition } from "react";
import { text } from "./text";

const BookText = ({ highlight }: { highlight: string }) => {
  if (highlight.length < 2) return <>{text}</>;

  const content = text.split(highlight).map((textEntry, index) => {
    return (
      <Fragment key={index}>
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
  const [deferredQuery, setDeferredQuery] = useState("");

  const [isDeferredQueryPending, startQueryTransition] = useTransition();

  useEffect(() => {
    console.log(query);
  });

  return (
    <div>
      <input
        onChange={({ target }) => {
          setQuery(target.value);
          startQueryTransition(() => {
            setDeferredQuery(target.value);
          });
        }}
        value={query}
        type="text"
        style={{ fontSize: "3rem" }}
      />
      <br />
      <div
        style={{
          opacity: isDeferredQueryPending ? 0.5 : 1,
          transitionProperty: "opacity",
          transitionDuration: isDeferredQueryPending ? "300ms" : "100ms",
        }}
      >
        <MemoedBookText highlight={deferredQuery} />
      </div>
    </div>
  );
}

export default App;
