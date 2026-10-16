import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "../components/Input";

const cadastroSchema = z
  .object({
    nome: z.string().trim().min(1, "Informe seu nome."),
    email: z.email("Informe um email válido."),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmarSenha: z.string().min(1, "Confirme sua senha."),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas devem ser iguais.",
    path: ["confirmarSenha"],
  });

type CadastroInput = z.input<typeof cadastroSchema>;
type CadastroOutput = z.output<typeof cadastroSchema>;

export function CadastroPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroInput, unknown, CadastroOutput>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Criar conta
        </h1>
        <p className="mt-2 text-slate-600">
          Preencha os dados para se cadastrar.
        </p>

        <form
          noValidate
          onSubmit={handleSubmit(() => navigate("/"))}
          className="mt-8 space-y-5"
        >
          <Input
            id="nome"
            label="Nome"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            error={errors.nome?.message}
            {...register("nome")}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="john.doe@email.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="senha"
            label="Senha"
            type="password"
            autoComplete="new-password"
            placeholder="********"
            error={errors.senha?.message}
            {...register("senha")}
          />

          <Input
            id="confirmarSenha"
            label="Confirmar senha"
            type="password"
            autoComplete="new-password"
            placeholder="********"
            error={errors.confirmarSenha?.message}
            {...register("confirmarSenha")}
          />

          <button
            type="submit"
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Criar conta
          </button>
        </form>
      </section>
    </main>
  );
}
