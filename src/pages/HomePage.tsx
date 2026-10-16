import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
        <div aria-hidden="true" className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
          ✓
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Conta criada com sucesso
        </h1>
        <p className="mt-3 text-slate-600">
          O formulário foi enviado com os dados válidos.
        </p>
        <Link
          to="/cadastro"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-700 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Criar outra conta
        </Link>
      </section>
    </main>
  )
}
