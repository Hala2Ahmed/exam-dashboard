interface StepHeaderProps {
    subtitle: string;
}

export function SubTitle({ subtitle }: StepHeaderProps) {
    return (
        <p className="font-inter text-2xl font-bold text-blue-600 pt-5">{subtitle}</p>
    );
}