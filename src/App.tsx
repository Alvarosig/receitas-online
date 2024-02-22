import './global.css'

import { useState } from 'react'

import style from './App.module.css'
import { AddReceipt } from './components/AddReceipt'
import { Filter } from './components/Filter'
import { Header } from './components/Header'
import { Receipts } from './components/Receipts'

export interface Recipes {
  id: string
  nome: string
  ingredientes: string
  preparo: string
  lactose: boolean
  gluten: boolean
}

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  const localStorageData = localStorage.getItem('receitas')
  const [recipes, setRecipes] = useState<Recipes[]>(
    JSON.parse(localStorageData ?? '[]'),
  )

  function addRecipe(newRecipe: Recipes) {
    const updatedRecipes = [...recipes, newRecipe]
    setRecipes(updatedRecipes)
    localStorage.setItem('receitas', JSON.stringify(updatedRecipes))
  }

  function openModal() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <>
      <div className={style.background}></div>

      <Header />
      <div className={style.wrapper}>
        <main>
          <Filter recipes={recipes} setRecipes={setRecipes} />
          <Receipts recipes={recipes} />
        </main>
        <button type="button" className={style.button} onClick={openModal} />
      </div>

      {isOpen && <AddReceipt toggleModal={openModal} onAddRecipe={addRecipe} />}
    </>
  )
}
