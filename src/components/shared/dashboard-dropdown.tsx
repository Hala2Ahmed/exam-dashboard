import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Bolt, EllipsisVertical, LogOut, UserRound } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function DropDownMenu() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <EllipsisVertical size={18} className="text-gray-500 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <Link href="/profile">
                        <DropdownMenuItem className="flex cursor-pointer gap-1.5 border-b border-gray-100">
                            <UserRound className="text-gray-500" size={18} />{' '}
                            Account
                        </DropdownMenuItem>
                    </Link>

                    <Link href="/profile">
                        <DropdownMenuItem className="flex cursor-pointer gap-1.5 border-b border-gray-100">
                            <Bolt className="text-gray-500" size={18} />{' '}
                            Dashboard
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem onClick={() => signOut()} className="flex cursor-pointer gap-1.5 border-b border-gray-100 text-red-600">
                        <LogOut
                            size={18}
                        />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
