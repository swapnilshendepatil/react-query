import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams()
  console.log(params)
  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
    const data = await response.json();
    return data
  };
  const { data: product, isLoading, error } = useQuery({ queryKey: ['products', params.productId], queryFn: fetchProduct })
  console.log(product)
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }
  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-48 w-full object-cover object-center" src={product.thumbnail} alt="Product Image" />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{product.title}</h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">{product.description}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${product.price}</p>
          <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">${product.discountPercentage}</p>
          <p className="ml-auto text-base font-medium text-green-500">${product.discountPercentage}</p>
        </div>
      </div>
    </div>
  )
}

export default Product