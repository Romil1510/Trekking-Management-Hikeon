import { ChevronDown } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

const Select = ({ children, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (value, label) => {
    setSelectedValue(label)
    onValueChange(value)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className="relative w-64">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
            selectedValue,
          })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: handleSelect,
          })
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = ({ children, onClick, isOpen, selectedValue }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center justify-between w-full p-3 rounded-full
      bg-gradient-to-r from-purple-600 to-blue-600 text-white
      cursor-pointer transition-all duration-300 shadow-lg
      ${isOpen ? "ring-2 ring-white" : ""}
    `}
  >
    {selectedValue || children}
    <ChevronDown className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} />
  </div>
)

const SelectContent = ({ children, isOpen, onSelect }) => (
  <div
    className={`
      absolute z-10 w-full mt-2 rounded-lg shadow-lg
      bg-gradient-to-r from-purple-600 to-blue-600
      transition-all duration-300 overflow-hidden
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
    style={{ maxHeight: isOpen ? "1000px" : "0" }}
  >
    <div className="py-1">{React.Children.map(children, (child) => React.cloneElement(child, { onSelect }))}</div>
  </div>
)

const SelectItem = ({ children, value, onSelect }) => (
  <div
    className="px-4 py-2 text-white hover:bg-white/20 cursor-pointer transition-colors duration-300"
    onClick={() => onSelect(value, children)}
  >
    {children}
  </div>
)

const SelectValue = ({ children }) => <>{children}</>

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }

