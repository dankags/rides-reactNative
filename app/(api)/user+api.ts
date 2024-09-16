/* eslint-disable prettier/prettier */
import { neon } from '@neondatabase/serverless';


export async function POST(req:Request){
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const {name,email,clerkId}= await req.json()
    if(!clerkId||!email||!name){
        return Response.json({error:"Missing required fields"},{status:400})
    }
    const response = await sql`
    INSERT INTO users (
      name, 
      email, 
      clerk_id
    ) 
    VALUES (
      ${name}, 
      ${email},
      ${clerkId}
   );`;

   return new Response(JSON.stringify({data:response}),{status:201})

  } catch (error) {
    console.log(error);
    return Response.json({error:error},{status:500})
  }
}



// See https://neon.tech/docs/serverless/serverless-driver
// for more information