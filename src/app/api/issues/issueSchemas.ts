import { z } from "zod";

export const createIssueSchema=z.object({
    title:z.string().min(1,{message:'Title is requried!'}),
    description:z.string().min(1,{message:'Description is required!'})
});

export const editIssueSchema=z.object({
    title:z.string().min(1,{message:'Title is requried!'}).optional().nullable(),
    description:z.string().min(1,{message:'Description is required!'}).optional().nullable(),
    assignedToUserId:z.string().optional().nullable()
})