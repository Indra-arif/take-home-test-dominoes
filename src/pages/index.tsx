import React, { useState } from "react";

function Dominoes() {
  const number = [
    [6, 1],
    [4, 3],
    [5, 1],
    [3, 4],
    [1, 1],
    [3, 4],
    [1, 2],
    [2, 2],
    [3, 3],
    [5, 1],
    [1, 5]
  ];

  const [dominos, setDominos] = useState(number);
  const [removeTotal, setRemoveTotal] = useState<number>(0);

  //menghitung berapa banyak yang double
  const doubleNumbers = (dominos: number[][]): number => {
    return dominos.filter(([a, b]) => a === b).length;
  };

  //asc/desc
  const sortDominos = (order: "asc" | "desc") => {
    const sorted = [...dominos].sort((domino1, domino2) => {
      const total1 = domino1[0] + domino1[1];
      const total2 = domino2[0] + domino2[1];


      if (order === "asc") {
        return total1 - total2;
      } else {
        return total2 - total1;
      }
    });
    setDominos(sorted);
  };

  //Flip
  const flipDominos = () => {
    const flip = dominos.map((domino) => {
      return [domino[1], domino[0]];
    });
    setDominos(flip);
  };

  //Reset
  const resetDomino = () => {
    setDominos(number);
  };

  //removeWithTotal
  const removeWithTotal = (total: number) => {
    const filtered = [];
    for (let i = 0; i < dominos.length; i++) {
      const domino = dominos[i];
      if (domino[0] + domino[1] !== total) {
        filtered.push(domino);
      }
    }
    setDominos(filtered);
  };


   // removedup
   const removeDuplicates = () => {
     const domino: Set<string> = new Set();
     const duplicates: Set<string> = new Set();
 
     for (let i = 0; i < dominos.length; i++) {
       const [a, b] = dominos[i];
       const sortedPair = [a, b].sort().toString();
 
       if (domino.has(sortedPair)) {
         duplicates.add(sortedPair);
       } else {
         domino.add(sortedPair);
       }
     }
 
     const filteredDominos = dominos.filter(([a, b]) => {
       const sortedPair = [a, b].sort().toString();
       return !duplicates.has(sortedPair);
     });
 
     setDominos(filteredDominos);
   };


  return (
    <div className="min-h-screen flex flex-col p-5">
      <h1 className="text-3xl font-bold mb-5">Dominoes</h1>

      {/* Source Section */}
      <div className="flex flex-col mb-4 border shadow-sm rounded-sm p-3">
        <div className="text-lg font-semibold mb-2">Source</div>
        <div className="flex">
          [{number.map((domino, index) => (
            <div key={index} className="bg-white">
              [{domino[0]}, {domino[1]}]
            </div>
          ))}]
        </div>
      </div>

      {/* Double Number Section */}
      <div className="flex flex-col mb-4 border rounded-sm p-3">
        <div className="text-lg font-semibold mb-2">Double Number</div>
        <div className="flex">
          <p>{doubleNumbers(dominos)}</p>
        </div>
      </div>

      {/* Grid of Domino Cards */}
      <div className="flex flex-wrap gap-2">
        {dominos.map((domino, index) => (
          <div
            key={index}
            className="bg-white p-2 border border-black flex flex-col items-center justify-between w-8 h-25"
          >
            <div className="text-sm font-semibold">{domino[0]}</div>
            <div className="my-1 text-xl">-</div>
            <div className="text-sm font-semibold">{domino[1]}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mb-4 py-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => sortDominos("asc")}
        >
          Sort (ASC)
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => sortDominos("desc")}
        >
          Sort (DESC)
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={flipDominos}
        >
          Flip
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={removeDuplicates}
        >
          Remove Dup
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={resetDomino}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col">
        <div className="gap-4 mb-4 py-5">
          <input
            type="number"
            placeholder="Input Number"
            onChange={(e) => setRemoveTotal(Number(e.target.value))}
            className="p-2 border rounded w-full"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-auto my-5"
            onClick={() => removeWithTotal(removeTotal)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dominoes;
