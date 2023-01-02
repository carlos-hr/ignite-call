import { Form, FormAnnotation } from './styles'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/router'

const claimUsernameFomrSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username deve ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username deve ter apenas letras e hifens',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFomrData = z.infer<typeof claimUsernameFomrSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFomrData>({
    resolver: zodResolver(claimUsernameFomrSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFomrData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="Seu usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
