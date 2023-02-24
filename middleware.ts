import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){

    const token = req.cookies.get('MyTokenSesion')
    
    if(req.nextUrl.pathname.includes('/proyectos')){
        if(!token){
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

}