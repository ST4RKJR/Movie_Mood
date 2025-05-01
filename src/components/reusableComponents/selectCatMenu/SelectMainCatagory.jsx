import { useState, useEffect } from "react";
import CatagoryMapping from "./CatagoryMapping";

const SelectMainCatagory = ({ onChange }) => {
  const [selected, setSelected] = useState(0);

  const types = [
    { id: "movie", name: "Movie" },
    { id: "tv", name: "Tv Show" },
  ];

  useEffect(() => {
    setSelected(0); // Reset selected index to 0 on category change
    onChange(types[0]); // Send the first genre to the parent on first load
  }, [onchange]);

  function handleChange(i) {
    if (i !== selected) { 
      setSelected(i);
      onChange(types[i]);
    }
  }

  return (
    <>
      <div className=" justify-center w-full gap-2 flex">
        <CatagoryMapping
          cataObject={types}
          currentSelected={selected}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default SelectMainCatagory;
