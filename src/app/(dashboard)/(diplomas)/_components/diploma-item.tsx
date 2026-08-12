import Image from "next/image"
import Link from "next/link"
import { Diploma } from "@/lib/types/diplomas"

interface DiplomaItemProps {
  diploma: Diploma
}

export default function DiplomaItem({ diploma }: DiplomaItemProps) {
  return (
    <li className=" h-64 overflow-hidden md:h-72 lg:h-100">
      {/* Link to the diploma details page */}
      <Link href={`/diplomas/${diploma.id}`} className="relative block h-full w-full">

        {/* Display the diploma image */}
        <Image
          src={diploma.image}
          alt={diploma.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Display diploma information */}
        <div className="absolute inset-x-0 bottom-0 max-h-24 overflow-hidden bg-blue-600/75 p-4 backdrop-blur-md transition-[max-height] duration-800 hover:delay-300 ease-in-out hover:max-h-full hover:overflow-y-auto custom-scrollbar">
          <h3 className="line-clamp-1 text-xl font-semibold text-white hover:line-clamp-none">
            {diploma.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-white/80 hover:line-clamp-none">
            {diploma.description}
          </p>
        </div>
      </Link>
    </li>
  )
}