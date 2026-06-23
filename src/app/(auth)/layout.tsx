import { BookOpenCheck, Brain, FolderIcon, RectangleEllipsis } from 'lucide-react'

const leftPanelClass = [
  'bg-[#EFF6FFBF]/75 relative w-1/2 flex-col justify-center overflow-hidden lg:flex hidden',
  'before:absolute before:left-[40rem] before:top-[6.875rem] before:-z-10',
  'before:h-402 before:w-402 before:rounded-full before:bg-[#50A2FF] before:blur-[12.5rem]',
  'after:absolute after:left-3.5 after:top-[40rem] after:-z-20',
  'after:h-402 after:w-402 after:rounded-full after:bg-[#50A2FF] after:blur-[12.5rem]',
].join(' ')

const features = [
  {
    icon: <Brain className="w-9" />,
    title: 'Tailored Diplomas',
    description: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
  },
  {
    icon: <BookOpenCheck className="w-9" />,
    title: 'Focused Exams',
    description: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
  },
  {
    icon: <RectangleEllipsis className="w-9" />,
    title: 'Smart Multi-Step Forms',
    description: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
  },
]


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className={leftPanelClass}>
        <div className="mx-auto max-w-lg space-y-10">
          <div className="flex items-center gap-2 text-blue-600">
            <FolderIcon />
            <span className="text-xl font-semibold">Exam App</span>
          </div>

          <h1 className="font-inter text-3xl font-bold text-gray-800">
            Empower your learning journey with our smart exam platform.
          </h1>

          <ul className="space-y-5">
            {features.map(({ icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="border border-blue-600 p-1 text-blue-600">{icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
                  <p className="text-gray-700">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
    </div>
  )
}