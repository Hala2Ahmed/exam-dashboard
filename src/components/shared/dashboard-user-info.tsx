import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

export default async function UserInfo() {
    const session = await getServerSession(authOptions)

    return (
        <>
            <h3 className="font-medium text-blue-600 truncate">
                {session?.user?.firstName}
            </h3>

            <p className="text-sm text-gray-500 truncate">{session?.user?.email}</p>
        </>
    )
}