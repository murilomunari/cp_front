import PokemonList from "../../components/PokemonList"
import { ResponsePokemonList } from "../../types/pokemon.type"

async function getData() {
  try {
    const resquest = await fetch('https://api.pokemontcg.io/v2/cards')
    const data = await resquest.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default async function PokemonsPage() {
  const respose: ResponsePokemonList = await getData()
  const pokemons = respose.data

  return (
    <div>
      <h1>Pokemons Page</h1>
      <PokemonList pokemons={pokemons} />
    </div>
  )
}