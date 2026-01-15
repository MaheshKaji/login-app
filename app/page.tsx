
'use client'

import { z } from 'zod' /*schema validation library*/
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' /*connects zod with react-hook-form*/

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

// Zod schema
const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>
/* type LoginFormValues = {
  email: string;
  password: string;
} */

export default function LoginPage() {
  //react-hook-form setup
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  //Submit handler
  const onSubmit = (data: LoginFormValues) => {
    console.log('Login Data:', data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

/* User types
 ↓
react-hook-form tracks inputs
 ↓
Submit clicked
 ↓
Zod validates schema
 ↓
Errors? → show messages
 ↓
No errors → onSubmit()
*/
