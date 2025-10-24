"use client";
import React from "react";


export default function Logo({ className = "w-28 h-28" }: { className?: string }) {
return (
<div className={`inline-flex items-center justify-center ${className}`}>
{/* Marca simples estilizada em SVG (coqueiro + tipografia) */}
<svg viewBox="0 0 320 120" className="w-full h-full">
<defs>
<linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
<stop offset="0%" stopColor="#0ea5a4" />
<stop offset="100%" stopColor="#22c55e" />
</linearGradient>
</defs>
{/* fundo gota */}
<circle cx="60" cy="60" r="52" fill="url(#g1)" opacity="0.18" />
{/* coqueiro */}
<g transform="translate(38,22)" fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round">
<path d="M18 22 C12 10, 0 6, -8 8 C2 10, 12 14, 18 22" />
<path d="M18 22 C24 10, 38 6, 46 8 C36 10, 26 14, 18 22" />
<path d="M18 22 C26 16, 36 18, 42 24 C34 22, 26 22, 18 22" />
<path d="M18 22 C10 16, 0 18, -6 24 C2 22, 10 22, 18 22" />
<path d="M18 22 L18 64" />
</g>
{/* texto */}
<text x="120" y="56" fontFamily="'Poppins', sans-serif" fontWeight="800" fontSize="28" fill="#064e3b">O COQUEIRO</text>
<text x="120" y="88" fontFamily="'Poppins', sans-serif" fontWeight="600" fontSize="22" fill="#0ea5a4">BELÉM</text>
</svg>
</div>
);
}