import { useQuery } from "@tanstack/react-query";

interface TodoItem {
	id: number
	status: boolean
	description: string
}

export function useTodoItems(){
    const {isLoading, error, data, isFetching} = useQuery({
        queryKey: ["todoItems"],
        queryFn: async ()=> {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/todo/items`)
            const result = await res.json()
            return result.data as TodoItem[]
        }
    })

    if(isLoading || isFetching || error || !data){
        return []
    }

    return data
}