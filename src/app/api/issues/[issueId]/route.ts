import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { editIssueSchema } from "../issueSchemas";

interface RouteProps{
    params:{
        issueId:string;
    }
}

export async function DELETE(request:NextRequest,{params:{issueId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions);
       if(!session?.user) return NextResponse.json({error:'Unauthorized'},{status:401})
        else {
            const issue=await prisma?.issue.findUnique({where:{id:Number(issueId)}})
            if(!issue) return NextResponse.json({error:'Issue not found!'},{status:404});
            await prisma?.issue.delete({where:{id:Number(issueId)}})
            return NextResponse.json({message:'Issue deleted!'},{status:200})
        }
    } catch (error) {
       return NextResponse.json({error},{status:500}) 
    }
}

export async function PUT(request:NextRequest,{params:{issueId}}:RouteProps){
    try {
        const session=await getServerSession(authOptions); 
        if(!session?.user) return NextResponse.json({error:"Unauthorized"},{status:401});
        else{
            const body=await request.json();
            const issue=await prisma?.issue.findUnique({where:{id:Number(issueId)}});
            if(!issue) return NextResponse.json({error:'Issue not found!'},{status:404});
            const validation= editIssueSchema.safeParse(body);
            if(!validation.success) return NextResponse.json({error:validation.error.format()},{status:400});
            const updatedIssue=await prisma?.issue.update({
                where:{id:Number(issueId)},
                data:{
                    title:body.title,description:body.description,assignedToUserId:body.assignedToUserId
                }
            })
            return NextResponse.json({updatedIssue},{status:200})
        }
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}