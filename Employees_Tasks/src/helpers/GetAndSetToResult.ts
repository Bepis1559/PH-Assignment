export const GetAndSetToResult = async (setFunction: (arrayToBeSet: any[]) => void, URL: string): Promise<void> => {
    try {
        const response = await fetch(URL)
        if (!response.ok) throw Error('Please reload the app,something went wrong')
        const result = await response.json()
        setFunction(result)
    } catch (error: any) {
        console.log(error.message)
    }
}