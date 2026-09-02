"use client"

import { Control, Controller } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ExamAnswersFields, Question } from "@/lib/types/questions"

interface QuestionCardProps {
    question: Question
    control: Control<ExamAnswersFields>
}

// Displays a single question with its answer options as selectable radio buttons
export default function QuestionCard({ question, control }: QuestionCardProps) {
    return (
        <fieldset>
            <legend className="text-2xl font-semibold text-blue-600 font-mono">
                {question.text}
            </legend>

            {/* Store this question's selected answer in the shared exam form */}
            <Controller
                name={`answers.${question.id}`}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        className="mt-4 gap-2.5"
                    >
                        {question.answers.map((answer) => {
                            const isSelected = field.value === answer.id

                            return (
                                <Label
                                    key={answer.id}
                                    htmlFor={answer.id}
                                    className={`flex cursor-pointer items-center gap-2.5 p-4 transition-colors ${isSelected
                                        ? "bg-gray-100"
                                        : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <RadioGroupItem value={answer.id} id={answer.id} />
                                    <span className="text-gray-800 text-sm font-mono">{answer.text}</span>
                                </Label>
                            )
                        })}
                    </RadioGroup>
                )}
            />
        </fieldset>
    )
}