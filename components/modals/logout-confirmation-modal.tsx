"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useTranslations } from "@/i18n/i18nContext"
import { LogOut } from "lucide-react"

interface LogoutConfirmationModalProps {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function LogoutConfirmationModal({ open, onConfirm, onCancel }: LogoutConfirmationModalProps) {
    const { t } = useTranslations()

    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 ring-2 ring-red-500/30">
                        <LogOut className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <AlertDialogTitle className="text-center text-xl">
                        {(t as any)?.common?.logoutConfirm?.title || "¿Cerrar sesión?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base">
                        {(t as any)?.common?.logoutConfirm?.description ||
                            "Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder a tu cuenta."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 font-semibold text-white shadow-md transition-all duration-200 hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                    >
                        {(t as any)?.common?.logoutConfirm?.confirm || "Sí, cerrar sesión"}
                    </AlertDialogAction>
                    <AlertDialogCancel
                        onClick={onCancel}
                        className="hover:bg-muted/50 mt-0 w-full border-2 font-medium transition-colors duration-200"
                    >
                        {(t as any)?.common?.logoutConfirm?.cancel || "Cancelar"}
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
