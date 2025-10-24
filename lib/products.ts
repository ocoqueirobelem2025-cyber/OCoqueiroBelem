export type Product = {
id: number;
nome: string;
descricao?: string;
preco: number;
imagem: string; // caminho em /public/img
categoria: "Água de Coco" | "Coco In Natura" | "Outros";
opcoes?: string[]; // ex.: ["Com gelo", "Sem gelo"]
};


export const products: Product[] = [
// ÁGUA DE COCO
{
id: 1,
nome: "Água de Coco 300ml",
descricao: "Garrafa PET 300ml — geladinha",
preco: 8,
imagem: "/img/300ml.png",
categoria: "Água de Coco",
opcoes: ["Com gelo", "Sem gelo"],
},
{
id: 2,
nome: "Água de Coco 1L",
descricao: "Garrafa 1 litro — ideal para levar",
preco: 24,
imagem: "/img/agua-1l.jpg",
categoria: "Água de Coco",
opcoes: ["Com gelo", "Sem gelo"],
},
{
id: 3,
nome: "Água de Coco 5L",
descricao: "Bombona 5 litros — eventos e atacado",
preco: 95,
imagem: "/img/agua-5l.jpg",
categoria: "Água de Coco",
},
// COCO IN NATURA
{
id: 10,
nome: "Coco Verde Unidade",
descricao: "Fruto fresco — pronto para abrir",
preco: 12,
imagem: "/img/coco-verde.jpg",
categoria: "Coco In Natura",
},
{
id: 11,
nome: "Coco Seco Unidade",
descricao: "Polpa branca — ideal para receitas",
preco: 10,
imagem: "/img/coco-seco.jpg",
categoria: "Coco In Natura",
},
// OUTROS
{
id: 20,
nome: "Copo 300ml",
descricao: "Água de coco copo — consumo imediato",
preco: 8,
imagem: "/img/copo-300.jpg",
categoria: "Outros",
opcoes: ["Com gelo", "Sem gelo"],
},
{
id: 21,
nome: "Polpa Congelada (200g)",
descricao: "Coco ralado fino congelado",
preco: 9.5,
imagem: "/img/polpa-200.jpg",
categoria: "Outros",
},
];


export const categorias = ["Água de Coco", "Coco In Natura", "Outros"] as const;