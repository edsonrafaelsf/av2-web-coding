import { useState } from 'react'

function App() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [buscaConcluida, setBuscaConcluida] = useState(false)

  async function buscarLivros() {
    setCarregando(true)
    setErro('')
    setBuscaConcluida(true)

    try {
      const resposta = await fetch('/api/livros')
      if (!resposta.ok) {
        throw new Error('A API retornou um erro.')
      }

      const dados = await resposta.json()
      if (!Array.isArray(dados.livros)) {
        throw new Error('A resposta da API nao contem uma lista de livros.')
      }

      setLivros(dados.livros)
    } catch {
      setLivros([])
      setErro('Não foi possível buscar os livros. Verifique se a API está em execução e tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="catalogo">
      <header className="cabecalho">
        <p className="identificacao">Biblioteca digital</p>
        <h1>Catálogo de Livros</h1>
        <button type="button" onClick={buscarLivros} disabled={carregando}>
          Buscar Livros
        </button>
      </header>

      <section className="resultados" aria-live="polite" aria-busy={carregando}>
        {carregando && <p className="mensagem" role="status">Carregando livros...</p>}
        {erro && <p className="mensagem mensagem-erro" role="alert">{erro}</p>}
        {!carregando && !erro && livros.length > 0 && (
          <ul className="lista-livros">
            {livros.map((livro) => (
              <li className="livro" key={livro.id}>
                <p className="livro-id">ID: {livro.id}</p>
                <h2>{livro.titulo}</h2>
                <p className="autor">{livro.autor}</p>
                <p className="ano">Ano: {livro.ano}</p>
              </li>
            ))}
          </ul>
        )}
        {!carregando && !erro && buscaConcluida && livros.length === 0 && (
          <p className="mensagem">Nenhum livro encontrado.</p>
        )}
      </section>
    </main>
  )
}

export default App