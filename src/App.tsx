import { useState, useEffect } from 'react'
import { ExpenseForm, ExpenseList } from './components'
import { Select, MenuItem } from '@mui/material'

export type Expense = {
  amount: number
  category: 'Food' | 'Transport' | 'Housing' | 'Health' | 'Other'
  description: string
  id: string
}

export const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<string[]>([
    'All',
    'Food',
    'Health',
    'Housing',
    'Other',
    'Transport',
  ])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    if (category === 'All') {
      setFilteredExpenses([])
    } else {
      setFilteredExpenses(
        expenses.filter((expense) => expense.category === category)
      )
    }
  }, [category])

  return (
    <>
      <ExpenseForm setExpenses={setExpenses} />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value as string)}
        sx={{
          display: 'block',
          margin: '0 auto',
          marginTop: 2,
          width: 200,
          backgroundColor: '#f5f5f5',
        }}
      >
        {categories.map((category) => {
          return (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          )
        })}
      </Select>

      <ExpenseList
        expenses={category === 'All' ? expenses : filteredExpenses}
        setExpenses={setExpenses}
      />
    </>
  )
}
