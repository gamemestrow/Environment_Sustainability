"use client"
import { redirect } from 'next/navigation'
import React from 'react'

const ReportBtn = () => {
  return (
    <button className="bg-green-600 hover:bg-green-500 text-black font-semibold px-8 py-3 rounded-lg transition" onClick={()=> redirect("/makereport")}>
          Report Waste
        </button>
  )
}

export default ReportBtn