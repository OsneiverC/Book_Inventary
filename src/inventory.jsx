import { useState } from 'react'

function BookForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [category, setCategory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBook = { title, author, coverUrl, quantity, category }
    onSubmit?.(newBook)
    setTitle('')
    setAuthor('')
    setCoverUrl('')
    setQuantity(1)
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Registrar nuevo libro</h2>

      <div>
        <label className="block font-semibold mb-1">Título</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 rounded-xl" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Autor</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full border p-2 rounded-xl" />
      </div>

      <div>
        <label className="block font-semibold mb-1">URL de portada</label>
        <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="w-full border p-2 rounded-xl" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Cantidad</label>
        <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border p-2 rounded-xl" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Categoría</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded-xl" />
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full">
        Guardar libro
      </button>
    </form>
  )
}

export default BookForm
