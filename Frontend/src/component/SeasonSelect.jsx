import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../component/ui/select"

const SeasonSelect = ({ onSeasonChange }) => {
  return (
    <Select onValueChange={onSeasonChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Season" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Seasons</SelectItem>
        <SelectItem value="summer">Summer</SelectItem>
        <SelectItem value="winter">Winter</SelectItem>
        <SelectItem value="monsoon">Monsoon</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SeasonSelect

