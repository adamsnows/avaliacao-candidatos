"use client";

import Link from "next/link";
import { Button, Checkbox, Input, Password } from "rizzui";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });

    if (result?.error) {
      setErrorMessage("Email ou senha incorreto.");
    } else if (result?.ok) {
      window.location.href = "/dashboard"; //
    }
  };

  return (
    <div className="flex gap-6 flex-col max-w-[420px]">
      <span className="font-bold text-primary">Entre na sua conta</span>
      <span className="font-light text-sm">
        Boas-vindas! Por favor, insira suas credenciais para acessar os sistemas
        da Comigo.
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          placeholder="Email"
          variant="outline"
          inputClassName="border-gray-400 border-2"
          {...register("email", { required: "Email é obrigatório" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Password
          placeholder="Senha"
          inputClassName="border-gray-400 border-2"
          {...register("password", { required: "Senha é obrigatória" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="flex justify-between items-center">
          <Checkbox
            label="Mantenha-me conectado."
            labelClassName="font-light text-sm"
            {...register("rememberMe")}
          />
          <Link href="/forgot-password" className="text-primary text-sm">
            Esqueci minha senha
          </Link>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <Button className="bg-primary" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default LoginComponent;
