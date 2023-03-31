import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { styles } from './styles'
import type { Expense } from '../../App'

interface Props {
  expenses: Expense[]
}

export const ExpenseList = ({ expenses }: Props) => {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
