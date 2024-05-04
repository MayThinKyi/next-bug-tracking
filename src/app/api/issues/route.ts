import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "./issueSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(request:NextRequest){
   try {
    const issues=await prisma?.issue.findMany();
    return NextResponse.json(issues)
   } catch (error) {
    return NextResponse.json({error},{status:500})
   }
}

export async function POST(request:NextRequest){
   try {
      const session=await getServerSession(authOptions);
    if(!session?.user)  return NextResponse.json({error:'Unauthorized'},{status:401})
      else{
         const body=await request.json();
         const validation=createIssueSchema.safeParse(body);
         if(!validation.success) return NextResponse.json({error:validation.error.format()},{status:400})
             const issue=await prisma?.issue.create({data:{
         title:body.title, description:body.description
         }})
         return NextResponse.json(issue,{status:201})
      }
   } catch (error) {
    return NextResponse.json({error},{status:500})
   }
}