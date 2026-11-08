import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  const search = () => {
    if (!query) {
      setData(undefined);
      return;
    }

    fetch(
      `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=y1ZFwiomdYKWy80gtSxU4iEdv165yeOD`
    )
      .then(response => response.json())
      .then(json => {
        setData(json.data);
      });
  };

  return (
    <div className="App">
      <h1>Giphy Client</h1>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault(); // prevents the page from reloading
            search();
          }}
        >
          <input value={query} onChange={e => setQuery(e.target.value)} />{" "}
          <input type="submit" value="Search" />
        </form>
      </div>

      {data && (
        <div>
          <h2>Results</h2>

          <ul>
            {data.map(d => (
              <li key={d.id}>
                <img src={d.images.fixed_width.url} alt={d.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
