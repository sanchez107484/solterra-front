"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const [locale, setLocale] = useState<"es" | "en">("es")

  const handleLocaleChange = (newLocale: "es" | "en") => {
    setLocale(newLocale)
    // In a real app, this would update the URL and trigger a re-render
    // For now, we'll just store it in localStorage
    localStorage.setItem("locale", newLocale)
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocaleChange("es")}>Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange("en")}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
