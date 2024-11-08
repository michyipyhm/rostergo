export async function getDailyManpower(date: string) {
    return await fetch('/api/manpower', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
}