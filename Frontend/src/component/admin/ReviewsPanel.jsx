"use client"

import { Star, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const ReviewsPanel = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/reviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch reviews")
      }
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!response.ok) {
          throw new Error("Failed to delete review")
        }
        fetchReviews() // Refresh the review list
      } catch (error) {
        setError(error.message)
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="text-black">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review._id}>
              <TableCell>{review.userId}</TableCell>
             
              <TableCell>
                <div className="flex items-center">
                  {review.rating}
                  <Star className="w-4 h-4 ml-1 text-yellow-400" />
                </div>
              </TableCell>
              <TableCell>{review.comment}</TableCell>
              
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review._id)}>
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

export default ReviewsPanel

