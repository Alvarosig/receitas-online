import cook from '../../assets/cook.svg'
import info from '../../assets/info.svg'
import style from './Receipts.module.css'

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
      <div>
        <h2>Receitas Cadastradas</h2>
        <ul>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <li key={recipe.id}>
                <img src={cook} alt="cooktop" />
                {recipe.nome}
                <img src={info} alt="cooktop" />
              </li>
            ))
          ) : (
            <li>Não há receitas cadastradas</li>
          )}
        </ul>
      </div>
    </main>
  )
}
