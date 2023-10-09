import * as React from "react"
import { z } from "zod"

import { DataTable } from "@/components/module/data-table"
import { columns } from "@/components/module/columns"
import { Product, productSchema } from "@/data/schema"

function App() {
  const [products, setProducts] = React.useState<Product[]>([])

  React.useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(z.array(productSchema).parse(data.products)))
  }, [])

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">List of ECC Products</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all products that ECC currently develops or maintains.
            </p>
          </div>
        </div>
       <DataTable data={products} columns={columns} />
      </div>
    </>
  )
}

export default App
