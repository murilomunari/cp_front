'use client'

import { Pokemon } from "@/types/pokemon.type"
import PokemonComponent from "./Pokemon"
import { useEffect, useState } from "react"

const PokemonList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPokemon, setPokemons] = useState(pokemons)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(`https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}&orderBy=number,name&perPage=15`)
      .then(res => res.json())
      .then(data => setPokemons(data.pokemons))
      .finally(() => setLoading(false))
  }, [searchTerm])

  return (
    <div>
      <input
        type="text"
        placeholder="Search pokemons..."
        className="mb-4 p-2 border"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-wrap gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPokemon.map(pokemon => (
            <PokemonComponent key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  )
}

export default PokemonList