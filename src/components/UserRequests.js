import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { requestsApi } from "../services/requestsApi"

const UserRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({ title: "", description: "" })
  const user = useSelector((state) => state)

  useEffect(() => {
    fetchUserRequests()
  }, [user.id])

  const fetchUserRequests = async () => {
    try {
      setLoading(true)
      const data = await requestsApi.getByUserId(user.id)
      setRequests(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement de vos demandes")
      console.error("Error fetching requests:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await requestsApi.create({
        ...formData,
        userId: user.id,
        status: "pending",
        createdAt: new Date().toISOString(),
      })
      setFormData({ title: "", description: "" }) // Reset form
      fetchUserRequests() // Refresh list
      alert("Demande soumise avec succès")
    } catch (error) {
      alert("Erreur lors de la soumission de la demande")
      console.error("Error submitting request:", error)
    }
  }

  const handleCancel = async (requestId) => {
    try {
      await requestsApi.delete(requestId)
      fetchUserRequests()
      alert("Demande annulée avec succès")
    } catch (error) {
      alert("Erreur lors de l'annulation de la demande")
      console.error("Error canceling request:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) return <div className="text-center p-4">Chargement...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Mes Demandes</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Soumettre la demande
        </button>
      </form>

      <div className="grid gap-4">
        {requests.map((request) => (
          <div key={request.id} className="border rounded-lg p-4 bg-white shadow">
            <h3 className="text-xl font-semibold">{request.title}</h3>
            <p className="text-gray-600 mt-2">{request.description}</p>
            <p className="mt-2">
              Statut: <span className="font-medium">{request.status}</span>
            </p>
            {request.status === "pending" && (
              <button
                onClick={() => handleCancel(request.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Annuler la demande
              </button>
            )}
          </div>
        ))}
        {requests.length === 0 && <p className="text-center text-gray-500">Vous n'avez pas encore de demandes</p>}
      </div>
    </div>
  )
}

export default UserRequests