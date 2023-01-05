import React from 'react'
import Head from 'next/head'

interface Props {
    title:string
    description?:string
}

export default function HeadCustom({title = "To Do App", description = "Is a To Do App Izi"}:Props) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
