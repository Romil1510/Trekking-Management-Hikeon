"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

const AddTreksPanel = ({ onTrekAdded }) => {
  const [trekData, setTrekData] = useState({
    name: "",
    location: "",
    description: "",
    duration: "",
    difficulty: "",
    price: "",
    image: "",
    maxGroupSize: "",
    altitude: "",
    bestSeason: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTrekData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setTrekData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/admin/treks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(trekData),
      })

      if (!response.ok) {
        throw new Error("Failed to add trek")
      }

      const newTrek = await response.json()
      onTrekAdded(newTrek)
      toast.success("Trek added successfully!")
      setTrekData({
        name: "",
        location: "",
        description: "",
        duration: "",
        difficulty: "",
        price: "",
        image: "",
        maxGroupSize: "",
        altitude: "",
        bestSeason: "",
      })
    } catch (error) {
      toast.error("Error adding trek: " + error.message)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Trek</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="name" value={trekData.name} onChange={handleInputChange} placeholder="Trek Name" required />
            <Input
              name="location"
              value={trekData.location}
              onChange={handleInputChange}
              placeholder="Location"
              required
            />
          </div>
          <Textarea
            name="description"
            value={trekData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="duration"
              value={trekData.duration}
              onChange={handleInputChange}
              placeholder="Duration (e.g., 5 days)"
              required
            />
            <Select name="difficulty" onValueChange={(value) => handleSelectChange("difficulty", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="challenging">Challenging</SelectItem>
                <SelectItem value="difficult">Difficult</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="price"
              value={trekData.price}
              onChange={handleInputChange}
              placeholder="Price"
              type="number"
              required
            />
            <Input
              name="maxGroupSize"
              value={trekData.maxGroupSize}
              onChange={handleInputChange}
              placeholder="Max Group Size"
              type="number"
              required
            />
          </div>
          <Input name="image" value={trekData.image} onChange={handleInputChange} placeholder="Image URL" required />
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="altitude"
              value={trekData.altitude}
              onChange={handleInputChange}
              placeholder="Max Altitude (e.g., 5000m)"
              required
            />
            <Input
              name="bestSeason"
              value={trekData.bestSeason}
              onChange={handleInputChange}
              placeholder="Best Season (e.g., Spring, Fall)"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gray-700 font-semibold text-lg">
            Add Trek
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddTreksPanel

