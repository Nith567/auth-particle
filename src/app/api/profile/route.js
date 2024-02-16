import { NextResponse } from 'next/server';
import prismadb from '@/app/lib/db';


export async function POST(
    req
  ) {
    try {
      const body = await req.json();
  const {eoa} = body;
      if(!eoa){
          return new NextResponse("eoa required", { status: 404});
      }

      const profile = await prismadb.user.create({
               data: {
                eoa
               }
          });
      return NextResponse.json(profile);
    } catch (error) {
      console.log('so theadd     ', error);
      return new NextResponse("Internal error:   ", { status: 500 });
    }
  };
