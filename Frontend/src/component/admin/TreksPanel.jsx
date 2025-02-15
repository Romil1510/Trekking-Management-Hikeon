"use client"

import { Edit, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const TreksPanel = () => {
  const [treks, setTreks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTreks()
  }, [])

  const fetchTreks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/treks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch treks")
      }
      const data = await response.json()
      setTreks(data)
    } catch (error) {
      toast.error("Error fetching treks: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTrek = async (trekId) => {
    if (window.confirm("Are you sure you want to delete this trek?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/treks/${trekId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to delete trek")
        }
        toast.success("Trek deleted successfully")
        fetchTreks() // Refresh the trek list
      } catch (error) {
        toast.error("Error deleting trek: " + error.message)
      }
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">All Treks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {treks.map((trek) => (
            <TableRow key={trek._id}>
              <TableCell>{trek.name}</TableCell>
              <TableCell>{trek.location}</TableCell>
              <TableCell>{trek.duration}</TableCell>
              <TableCell>{trek.difficulty}</TableCell>
              <TableCell>${trek.price}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="mr-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTrek(trek._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TreksPanel

