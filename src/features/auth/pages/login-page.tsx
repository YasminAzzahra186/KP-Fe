import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Compass, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { loginSchema, type LoginFormData } from '../validations'

/**
 * Login page with React Hook Form + Zod validation.
 * Currently uses mock auth (no backend).
 */
export function LoginPage() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    // TODO: Replace with real API call
    // const response = await authService.login(data)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isAdmin = data.email.includes('admin')

    // Mock user for development
    setUser({
      id: isAdmin ? '1' : '2',
      name: isAdmin ? 'Admin User' : 'Employee User',
      email: data.email,
      role: isAdmin ? 'admin' : 'user',
    })

    setIsLoading(false)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Compass className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Tracking App</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your admin panel
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="admin@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Dev hint */}
          <div className="mt-6 rounded-lg bg-muted/50 p-3 text-center text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Development Mock Login:</p>
            <p>• Email containing <code className="bg-background px-1 rounded">admin</code> → Logs in as **Admin**</p>
            <p>• Any other email → Logs in as **Regular User**</p>
          </div>
        </div>
      </div>
    </div>
  )
}
