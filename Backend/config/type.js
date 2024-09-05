import {z} from 'zod'

export const SignUp = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
})

export const SignIn = z.object({
    username: z.string(),
    password: z.string(),
})

export const ProductType = z.object({
    name: z.string(),
    description: z.string(),
    quantity: z.string(),
    price: z.string(),
    category: z.string()
})

