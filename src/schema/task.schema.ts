import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().nonempty({ message: 'Please enter a Title' }),
    description: z.string().optional(),
    category: z.enum(['personal', 'education', 'work'], {
        invalid_type_error: 'Please select a valid Category'
    }),
    priority: z.enum(['high', 'medium', 'low'], {
        invalid_type_error: 'Please select a valid Priority',
    }),
    due_date: z.string().nonempty({ message: 'Please select a date' })
});