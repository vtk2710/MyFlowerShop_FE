// import { useState } from 'react'
// import Input from 'antd/es/input/Input'
// import { Button } from 'antd'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// //import ResponsiveNavMenu from './NavMenu'
// import { Link } from 'react-router-dom'
// import Header from '../components/Header/header'

// const flowers = [
//     { id: 1, name: "Rose", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 2, name: "Tulip", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 3, name: "Sunflower", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 4, name: "Orchid", type: "Indoor", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 5, name: "Lily", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 6, name: "Daisy", type: "Wildflower", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 7, name: "Carnation", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 8, name: "Chrysanthemum", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 9, name: "Daffodil", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 10, name: "Peony", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 11, name: "Lavender", type: "Herb", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 12, name: "Marigold", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 13, name: "Poppy", type: "Wildflower", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 14, name: "Dahlia", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 15, name: "Iris", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
//     { id: 16, name: "Zinnia", type: "Garden", image: "https://th.bing.com/th/id/OIP.AQwDFG0OSRGKrumTy7i9iQHaJ6?rs=1&pid=ImgDetMain" },
// ]

// export default function ShopPage() {
//     const [search, setSearch] = useState("")
//     const [filter, setFilter] = useState("All")
//     const [currentPage, setCurrentPage] = useState(1)
//     const itemsPerPage = 8

//     const filteredFlowers = flowers.filter(flower =>
//         flower.name.toLowerCase().includes(search.toLowerCase()) &&
//         (filter === "All" || flower.type === filter)
//     )

//     const pageCount = Math.ceil(filteredFlowers.length / itemsPerPage)
//     const currentFlowers = filteredFlowers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     )

//     return (
//         <div>
//             <Header/>
//             <div className="container mx-auto p-4">
//                 <div className="mb-4 flex gap-4">
//                     <Input
//                         type="text"
//                         placeholder="Search flowers..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="flex-grow"
//                     />
//                     <Select value={filter} onValueChange={setFilter}>
//                         <SelectTrigger className="w-[180px]">
//                             <SelectValue placeholder="Filter by type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="All">All</SelectItem>
//                             <SelectItem value="Garden">Garden</SelectItem>
//                             <SelectItem value="Indoor">Indoor</SelectItem>
//                             <SelectItem value="Wildflower">Wildflower</SelectItem>
//                             <SelectItem value="Herb">Herb</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//                     {currentFlowers.map((flower) => (
//                         <Card key={flower.id}>
//                             <CardHeader>
//                                 <CardTitle>{flower.name}</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <img
//                                     src={`${flower.image}${flower.name}`}
//                                     alt={flower.name}
//                                     className="w-full h-40 object-cover rounded-md"
//                                 />
//                             </CardContent>
//                             <CardFooter>
//                                 <p className="text-sm text-muted-foreground">{flower.type}</p>
//                                 <div className='flex ml-20'>
//                                     <Link to="/flower-details">See details</Link>
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>

//                 <Pagination>
//                     <PaginationContent>
//                         <PaginationItem>
//                             <PaginationPrevious
//                                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                 disabled={currentPage === 1}
//                             />
//                         </PaginationItem>
//                         {[...Array(pageCount)].map((_, i) => (
//                             <PaginationItem key={i}>
//                                 <PaginationLink
//                                     onClick={() => setCurrentPage(i + 1)}
//                                     isActive={currentPage === i + 1}
//                                 >
//                                     {i + 1}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         ))}
//                         <PaginationItem>
//                             <PaginationNext
//                                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
//                                 disabled={currentPage === pageCount}
//                             />
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             </div>
//         </div>
//     )
// }