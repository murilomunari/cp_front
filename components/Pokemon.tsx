import { useEffect, useState } from 'react'
import { Pokemon } from '../types/pokemon.type'

const PokemonComponent = ({ pokemon }: { pokemon: Pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const checkIfFavorite = () => {
    const pokemons = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = pokemons.some((p: Pokemon) => p.id === pokemon.id)
    return exists
  }

  useEffect(() => {
    setIsFavorite(checkIfFavorite())
  }, [pokemon.id])

  const handleFavorite = () => {
    const pokemons = JSON.parse(localStorage.getItem('favorites') || '[]')

    const exists = checkIfFavorite()
    if (!exists) {
      pokemons.push(pokemon)
      localStorage.setItem('favorites', JSON.stringify(pokemons))
    } else {
      const newPokemons = pokemons.filter((p: Pokemon) => p.id !== pokemon.id)
      localStorage.setItem('favorites', JSON.stringify(newPokemons))
    }
    setIsFavorite(!exists)
  }


  return (
    <div className="flex flex-col border p-4">
      <figure>
        <img src={pokemon.images.large} alt={pokemon.name} />
      </figure>
      <div className="pokemon-details">
        <h2>#{pokemon.nationalPokedexNumbers} - {pokemon.name}</h2>
        <p>HP: {pokemon.hp}</p>
        <div>
          {
            pokemon.types.map(type => (
                <div>
                    {type}
                </div>
            ))
          }

        </div>
        <button onClick={handleFavorite}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    </div>
  )
}

export default PokemonComponent