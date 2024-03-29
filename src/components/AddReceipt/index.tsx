import style from './AddReceipt.module.css'
import cook from '../../assets/cook.svg'
import { useForm } from 'react-hook-form'
import { Recipes } from '../../App'

interface DataType {
  nome: string
  ingredientes: string
  preparo: string
  lactose: boolean
  gluten: boolean
}

interface AddReceiptProps {
  toggleModal: () => void
  onSubmitForm: (newRecipe: Recipes) => void
  onDeleteItem?: (id: string) => void
  recipe?: Recipes
}

export function AddReceipt({
  toggleModal,
  onSubmitForm,
  recipe,
  onDeleteItem,
}: AddReceiptProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: recipe?.nome ?? '',
      ingredientes: recipe?.ingredientes ?? '',
      preparo: recipe?.preparo ?? '',
      lactose: recipe?.lactose ?? false,
      gluten: recipe?.gluten ?? false,
    },
  })

  function onSubmit(data: DataType) {
    const newRecipe = {
      id: crypto.randomUUID() as string,
      nome: data.nome,
      ingredientes: data.ingredientes,
      preparo: data.preparo,
      lactose: data.lactose,
      gluten: data.gluten,
    }

    if (recipe) {
      newRecipe.id = recipe.id
    }

    onSubmitForm(newRecipe)

    reset()
    toggleModal()
  }

  return (
    <div className={style.addReceipt}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {recipe ? <h2>Editar Receita</h2> : <h2>Adicionar receita</h2>}

        <div className={style.formWrapper}>
          <div className={style.inputGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              {...register('nome', {
                required: 'Preencha com o nome da receita.',
              })}
            />
          </div>
          <p>{errors.nome?.message}</p>

          <div className={style.inputGroup}>
            <label htmlFor="ingredientes">Ingredientes</label>
            <textarea
              id="ingredientes"
              {...register('ingredientes', {
                required: 'Preencha com os ingredientes da receita.',
              })}
            />
          </div>
          <p>{errors.ingredientes?.message}</p>

          <div className={style.inputGroup}>
            <label htmlFor="preparo">Modo de preparo</label>
            <textarea
              id="preparo"
              {...register('preparo', {
                required: 'Preencha com o modo de preparo da receita.',
              })}
            />
          </div>
          <p>{errors.preparo?.message}</p>

          <div className={style.inputGroup}>
            <label>Restrições</label>
            <div>
              <input type="checkbox" {...register('lactose')} id="lactose" />
              <label htmlFor="lactose">Lactose</label>

              <input type="checkbox" {...register('gluten')} id="gluten" />
              <label htmlFor="gluten">Gluten</label>
            </div>
          </div>
        </div>

        {recipe ? (
          <div className={style.buttons}>
            <button type="submit">Alterar</button>
            <button
              type="button"
              onClick={() => !!onDeleteItem && onDeleteItem(recipe?.id)}
            >
              Excluir
            </button>
          </div>
        ) : (
          <div className={style.buttons}>
            <button type="submit">Inserir</button>
          </div>
        )}
        <img src={cook} alt="" />
      </form>
    </div>
  )
}
