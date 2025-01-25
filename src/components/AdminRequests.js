import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { requestsApi } from "../services/requestsApi"

const AdminRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useSelector((state) => state)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const data = await requestsApi.getAll()
      setRequests(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des demandes")
      console.error("Error fetching requests:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await requestsApi.update(requestId, {
        status: newStatus,
        updatedBy: user.id,
        updatedAt: new Date().toISOString(),
      })
      fetchRequests() // Recharger la liste après la mise à jour
      alert('Statut mis à jour avec succès : ${newStatus}')
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut")
      console.error("Error updating request:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600"
      case "approved":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) return <div className="text-center p-4">Chargement...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Gestion des Demandes</h2>
      {requests.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600">Aucune demande n'a été trouvée.</p>
          <p className="text-sm text-gray-500 mt-2">
            Les demandes apparaîtront ici une fois que les utilisateurs en auront créé.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 bg-white shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{request.title}</h3>
                  <p className="text-gray-600 mt-2">{request.description}</p>
                  <p className="mt-2">
                    Créé par: <span className="font-medium">{request.userId}</span>
                  </p>
                  <p className={'mt-1 font-medium ${getStatusColor(request.status)}'}>Statut: {request.status}</p>
                </div>
                <div className="flex gap-2">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, "approved")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, "rejected")}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Rejeter
                      </button>
                    </>
                  )}
                  {request.status !== "pending" && (
                    <button
                      onClick={() => handleStatusChange(request.id, "pending")}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Remettre en attente
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminRequests