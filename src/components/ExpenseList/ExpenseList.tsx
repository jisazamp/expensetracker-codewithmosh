import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { BsTrash } from 'react-icons/bs'
import { styles } from './styles'
import type { Expense } from '../../App'

interface Props {
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const ExpenseList = ({ expenses, setExpenses }: Props) => {
  const matches = useMediaQuery('(min-width: 768px)')

  const handleExpenseDeletion = (expense: Expense): void => {
    setExpenses((prevState) => prevState.filter((el) => el.id !== expense.id))
  }

  if (expenses.length === 0) {
    return (
      <Container>
        <Box sx={styles.container}>
          <Typography
            component='h1'
            fontWeight={600}
            marginTop={2}
            fontSize={24}
          >
            Expense List
          </Typography>
          <Typography
            component='h2'
            fontWeight={600}
            marginTop={2}
            fontSize={18}
          >
            No expenses found
          </Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container sx={styles.outerContainer}>
      <Box sx={styles.container}>
        <Typography component='h1' fontWeight={600} marginTop={2} fontSize={24}>
          Expense List
        </Typography>

        <TableContainer sx={{ backgroundColor: 'white' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleExpenseDeletion(expense)}
                    >
                      {matches ? 'Delete' : <BsTrash />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>
                  {expenses.reduce(
                    (prevValue, currValue) => prevValue + currValue.amount,
                    0
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
