import { useState } from "react";

const startList = ["Pikachu", "Charizard", "Bulbasaur", "Squirtle"];

function ToDoList() {
  const [pokemons, setPokemons] = useState(startList);
  const [newPokemon, setNewPokemon] = useState("");

  function handleInputChange(event) {
    setNewPokemon(event.target.value);
  }

  function addPokemon() {
    if (newPokemon.trim() !== "") {
      setPokemons((p) => [...p, newPokemon.trim()]);
      setNewPokemon("");
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addPokemon();
    }
  }

  function deletePokemon(index) {
    const updatedPokemons = pokemons.filter((_, i) => i !== index);
    setPokemons(updatedPokemons);
  }

  function movePokemonUp(index) {
    if (index > 0) {
      const updatedPokemons = [...pokemons];

      [updatedPokemons[index], updatedPokemons[index - 1]] = [
        updatedPokemons[index - 1],
        updatedPokemons[index],
      ];

      setPokemons(updatedPokemons);
    }
  }

  function movePokemonDown(index) {
    if (index < pokemons.length - 1) {
      const updatedPokemons = [...pokemons];

      [updatedPokemons[index], updatedPokemons[index + 1]] = [
        updatedPokemons[index + 1],
        updatedPokemons[index],
      ];

      setPokemons(updatedPokemons);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="text-5xl">⚡</div>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              Pokémon List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Build your Pokémon team
            </p>
          </div>

          {/* Add Pokémon */}
          <div className="mb-6 flex gap-3">
            <input
              type="text"
              value={newPokemon}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter Pokémon name..."
              className="
                flex-1
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                outline-none
                transition
                focus:border-yellow-400
                focus:bg-white
                focus:ring-4
                focus:ring-yellow-400/20
              "
            />

            <button
              onClick={addPokemon}
              className="
                rounded-xl
                bg-yellow-400
                px-5
                text-xl
                font-bold
                text-slate-800
                shadow-sm
                transition
                hover:bg-yellow-500
                active:scale-95
              "
            >
              +
            </button>
          </div>

          {/* Pokémon List */}
          <ol className="space-y-3">
            {pokemons.map((pokemon, index) => (
              <li
                key={index}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border border-slate-200
                  bg-slate-50
                  p-3
                  transition
                  hover:bg-white
                  hover:shadow-md
                "
              >
                {/* Number */}
                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-yellow-400
                    font-bold
                    text-slate-800
                  "
                >
                  {index + 1}
                </span>

                {/* Pokémon */}
                <span className="flex-1 font-semibold text-slate-700">
                  {pokemon}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deletePokemon(index)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  🗑
                </button>

                {/* Up */}
                <button
                  onClick={() => movePokemonUp(index)}
                  disabled={index === 0}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-500
                    hover:bg-slate-200
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  ↑
                </button>

                {/* Down */}
                <button
                  onClick={() => movePokemonDown(index)}
                  disabled={index === pokemons.length - 1}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-500
                    hover:bg-slate-200
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  ↓
                </button>
              </li>
            ))}
          </ol>

          {/* Footer */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="text-center text-sm text-slate-400">
              {pokemons.length} Pokémon in your team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
