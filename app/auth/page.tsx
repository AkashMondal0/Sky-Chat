'use client'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import AuthSocialButton from '@/components/Button/AuthSocialButton';
import { Typography } from '../Material';
import { LoginFireBase, RegisterFireBase } from '../../services/firebase/auth';
import UserContext from '@/context/User/UserContext';
import { UserContextIn } from '@/interfaces/User';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const User = useContext<UserContextIn>(UserContext)

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      RegisterFireBase({ email: data.email, password: data.password, name: data.name })
        .then((user) => {
          if (!user) {
            toast.error("Invalid Credential")
          }
          // set user
         else{
          User.dispatch({ type: "SET_USER", payload: user })
          router.push('/')
         }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    }

    if (variant === "LOGIN") {
      LoginFireBase({ email: data.email, password: data.password })
        .then((user) => {
          if (!user) {
            toast.error("Invalid Credential")
          }
          // set user
          else{
            User.dispatch({ type: "SET_USER", payload: user })
            router.push('/')
           }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <React.Fragment>
      <div className="h-screen items-center justify-center flex">
        <div
          className="
          bg-white
            px-4
            py-8
            sm:rounded-lg
            sm:px-10
            w-[500px]
            h-[500px]
          "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h1">Chat {variant === "REGISTER" ? "Register" : "Login"}</Typography>
            {variant === "REGISTER" && (<Input
              label='name'
              id='name'
              register={register}
              disabled={isLoading}
              errors={errors} />)}

            <Input
              label='email'
              id='email'
              register={register}
              disabled={isLoading}
              errors={errors} />
            <Input
              label='password'
              id='password'
              register={register}
              disabled={isLoading}
              errors={errors} />
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type='submit'
              >{variant === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute 
                  inset-0 
                  flex 
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => { }}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => { }}
              />
            </div>
          </div>
          <div
            className="
              flex 
              gap-2 
              justify-center 
              text-sm 
              mt-6 
              px-2 
              text-gray-500
            "
          >
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div
              onClick={toggleVariant}
              className="underline cursor-pointer"
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuthForm