import useAuth from "./useAuth"
import { getRole } from "../api/auth"
import { useQuery } from "@tanstack/react-query"

const useRole = () => {
    const { user, loading } = useAuth()
    const { data: role, isLoading, error } = useQuery({
        enabled: !loading && !!user?.email,
        queryFn: async () => await getRole(user?.email),
        queryKey: ['role', user?.email],
        retry: 1,
    })

    // Return loading as true if:
    // - Auth is still loading
    // - Role query is loading  
    // - There's an error (to prevent premature redirects)
    // return [role, loading || isLoading || !!error]
    return [role, loading || isLoading]
}

export default useRole;

// import useAuth from "./useAuth"
// import { getRole } from "../api/auth"
// import { useQuery } from "@tanstack/react-query"

// const useRole = () => {
//     const { user, loading } = useAuth()
//     const { data: role, isLoading } = useQuery({
//         enabled: !loading && !!user?.email,
//         queryFn: async () => await getRole(user?.email),
//         queryKey: ['role'],
//     })
//     return [role, isLoading]

// }



// export default useRole;