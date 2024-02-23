import { useState } from 'react'
import cook from '../../assets/cook.svg'
import info from '../../assets/info.svg'
import style from './Receipts.module.css'
import { AddReceipt } from '../AddReceipt'

interface Recipes {
  id: string
  nome: string
  ingredientes: string
  preparo: string
  lactose: boolean
  gluten: boolean
}

interface ReceiptsProps {
  recipes: Recipes[]
}

export function Receipts({ recipes }: ReceiptsProps) {
  return (
    <main className={style.receipts}>
      <div className={style.container}>
        <h2>Receitas Cadastradas</h2>
        <ul>
          {recipes.length > 0 ? (
            recipes.map((recipe) => <Item recipe={recipe} key={recipe.id} />)
          ) : (
            <li>Não há receitas cadastradas</li>
          )}
        </ul>
      </div>
    </main>
  )
}

export function Item({ recipe }: { recipe: Recipes }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleUpdateRecipe(recipe: Recipes) {
    const oldRecipes: Recipes[] = JSON.parse(
      localStorage.getItem('receitas') || '[]',
    )
    const updatedRecipes = oldRecipes.map((item) => {
      if (item.id === recipe.id) {
        return recipe
      }
      return item
    })
    localStorage.setItem('receitas', JSON.stringify(updatedRecipes))
  }

  function handleDeleteRecipe(id: string) {
    const oldRecipes: Recipes[] = JSON.parse(
      localStorage.getItem('receitas') || '[]',
    )
    const updatedRecipes = oldRecipes.filter((item) => item.id !== id)
    localStorage.setItem('receitas', JSON.stringify(updatedRecipes))

    setIsOpen(false)
  }

  return (
    <>
      <li key={recipe.id} onClick={() => setIsOpen(true)}>
        <img src={cook} alt="cooktop" />
        {recipe.nome}
        <img src={info} alt="cooktop" />
      </li>
      {isOpen && (
        <AddReceipt
          recipe={recipe}
          onSubmitForm={handleUpdateRecipe}
          onDeleteItem={handleDeleteRecipe}
          toggleModal={() => setIsOpen((prevValue) => !prevValue)}
        />
      )}
    </>
  )
}
