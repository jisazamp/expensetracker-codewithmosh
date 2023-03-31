import {
  Box,
  Button,
  Container,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { styles } from './styles'
import type { Expense } from '../../App'

const categories = ['Food', 'Transport', 'Housing', 'Health', 'Other']
const schema = z.object({
  description: z.string().min(1).max(100),
  amount: z
    .number({
      invalid_type_error: 'Amount must be a number',
    })
    .min(0),
  category: z.enum(['Food', 'Transport', 'Housing', 'Health', 'Other']),
})

type FormData = z.infer<typeof schema>

interface Props {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const ExpenseForm = ({ setExpenses }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: prevExpenses.length + 1 + '',
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ])

    reset({
      description: '',
      amount: 0,
      category: 'Housing',
    })
  }

  return (
    <Container>
      <Box component='section' sx={styles.container}>
        <Typography color='#333' fontWeight={600} component='h1' fontSize={24}>
          Register a new expense
        </Typography>

        <Box component='div' sx={styles.form}>
          <FormGroup>
            <InputLabel htmlFor='description' error={!!errors.description}>
              Description
            </InputLabel>
            <TextField
              id='description'
              error={!!errors.description}
              {...register('description')}
            />
            {errors.description && (
              <Typography color='#f44336' component='p' fontSize={12}>
                {errors.description.message}
              </Typography>
            )}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor='amount' error={!!errors.amount}>
              Amount
            </InputLabel>
            <TextField
              id='amount'
              error={!!errors.amount}
              type='number'
              {...register('amount', {
                valueAsNumber: true,
              })}
            />
            {errors.amount && (
              <Typography color='#f44336' component='p' fontSize={12}>
                {errors.amount.message}
              </Typography>
            )}
          </FormGroup>

          <FormGroup>
            <InputLabel htmlFor='category' error={!!errors.category}>
              Category
            </InputLabel>
            <Select
              id='category'
              error={!!errors.category}
              defaultValue={categories[0]}
              {...register('category')}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography color='#f44336' component='p' fontSize={12}>
                {errors.category.message}
              </Typography>
            )}
          </FormGroup>

          <Button
            variant='contained'
            sx={{ marginTop: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography
              color='#fff'
              fontWeight={600}
              component='h1'
              fontSize={16}
            >
              Register
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
