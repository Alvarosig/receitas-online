import { Dispatch, SetStateAction, useState } from 'react'
import style from './Filter.module.css'

interface Recipes {
  id: string
  nome: string
  ingredientes: string
  preparo: string
  lactose: boolean
  gluten: boolean
}

interface FilterProps {
  recipes: Recipes[]
  setRecipes: Dispatch<SetStateAction<Recipes[]>>
}

export function Filter({ recipes, setRecipes }: FilterProps) {
  const [semLeite, setSemLeite] = useState(false)
  const [semGluten, setSemGluten] = useState(false)
  const [todas, setTodas] = useState(true)

  const localStorageData = localStorage.getItem('receitas')

  const handleFilter = () => {
    let filteredRecipes: Recipes[] = [...recipes]

    if (semLeite) {
      filteredRecipes = filteredRecipes.filter((recipe) => !recipe.lactose)
    }

    if (semGluten) {
      filteredRecipes = filteredRecipes.filter((recipe) => !recipe.gluten)
    }

    if (todas) {
      filteredRecipes = JSON.parse(localStorageData ?? '[]')
    }

    setRecipes(filteredRecipes)
  }

  return (
    <div className={style.filter}>
      <h2>Filtrar:</h2>

      <div className={style.checkboxContainer}>
        <input
          type="checkbox"
          checked={semLeite}
          onChange={() => setSemLeite(!semLeite)}
          id="s-leite"
        />
        <label htmlFor="s-leite">Sem derivados de leite</label>
      </div>

      <div className={style.checkboxContainer}>
        <input
          type="checkbox"
          checked={semGluten}
          onChange={() => setSemGluten(!semGluten)}
          id="s-gluten"
        />
        <label htmlFor="s-gluten">Sem glúten</label>
      </div>

      <div className={style.checkboxContainer}>
        <input
          type="checkbox"
          checked={todas}
          onChange={() => setTodas(!todas)}
          id="todas"
        />
        <label htmlFor="todas">Todas</label>
      </div>
      <div className={style.button}>
        <button type="button" onClick={handleFilter}>
          Filtrar
        </button>
      </div>
    </div>
  )
}
