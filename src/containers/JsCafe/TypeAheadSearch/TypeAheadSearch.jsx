"use client";

import React from "react";
import SearchBox from "../../../components/JsCafe/TypeAheadSearch/SearchBox";
import ListBox from "./ListBox";

import "./TypeAheadSearch.css";

const TypeAheadSearch = () => {
  const transformData = (data, maxItems) => data.results.slice(0, maxItems);

  const dataPromise = async (query, signal) => {
    const url = `https://swapi.dev/api/people/?search=${query}`;
    return await fetch(url, { signal });
  };

  return (
    <div className='wrapper'>
      <SearchBox
        maxItems={5}
        id='personName'
        name='personName'
        debounceWait={400}
        autoComplete={true}
        label='Enter Person Name'
        transformData={transformData}
        placeholder='Enter your fav star war person'
        listBox={(items, activeIdx) => (
          <ListBox items={items} activeIdx={activeIdx} />
        )}
        noItemMessage={() => <div>Sorry no person found</div>}
        errorMessage={() => <div>Something went wrong!</div>}
        styles={{
          label: "label",
          input: "input",
        }}
        dataPromise={dataPromise}
      />
    </div>
  );
};

export default TypeAheadSearch;
