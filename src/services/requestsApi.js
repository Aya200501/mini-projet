// Données initiales simulées
const requests = [
    {
      id: "1",
      title: "Demande de congés",
      description: "Je souhaite prendre une semaine de congés en août.",
      status: "pending",
      userId: "1",
      createdAt: "2023-07-01T10:00:00Z",
      updatedAt: null,
    },
    {
      id: "2",
      title: "Demande de formation",
      description: "J'aimerais suivre une formation en React avancé.",
      status: "approved",
      userId: "2",
      createdAt: "2023-07-02T14:30:00Z",
      updatedAt: "2023-07-03T09:15:00Z",
    },
    {
      id: "3",
      title: "Demande de matériel",
      description: "Mon ordinateur est lent, je demande un upgrade.",
      status: "rejected",
      userId: "1",
      createdAt: "2023-07-03T11:45:00Z",
      updatedAt: "2023-07-04T16:20:00Z",
    },
  ]
  
  // Simuler un délai réseau
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  
  // API simulée
  export const requestsApi = {
    // Obtenir toutes les demandes
    getAll: async () => {
      await delay(500) // Simuler un délai réseau
      return [...requests]
    },
  
    // Obtenir les demandes d'un utilisateur spécifique
    getByUserId: async (userId) => {
      await delay(500)
      return requests.filter((request) => request.userId === userId)
    },
  
    // Créer une nouvelle demande
    create: async (newRequest) => {
      await delay(500)
      const request = {
        ...newRequest,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: null,
      }
      requests.push(request)
      return request
    },
  
    // Mettre à jour une demande existante
    update: async (id, updatedRequest) => {
      await delay(500)
      const index = requests.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests[index] = {
          ...requests[index],
          ...updatedRequest,
          updatedAt: new Date().toISOString(),
        }
        return requests[index]
      }
      throw new Error("Demande non trouvée")
    },
  
    // Supprimer une demande
    delete: async (id) => {
      await delay(500)
      const index = requests.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.splice(index, 1)
        return true
      }
      throw new Error("Demande non trouvée")
    },
  
    // Obtenir une demande spécifique par son ID
    getById: async (id) => {
      await delay(500)
      const request = requests.find((request) => request.id === id)
      if (request) {
        return request
      }
      throw new Error("Demande non trouvée")
    },
  
    // Changer le statut d'une demande
    changeStatus: async (id, newStatus) => {
      await delay(500)
      const index = requests.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests[index] = {
          ...requests[index],
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
        return requests[index]
      }
      throw new Error("Demande non trouvée")
    },
  }