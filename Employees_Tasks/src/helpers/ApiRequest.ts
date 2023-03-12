export const ApiRequest = async (url = '', optionsObj: RequestInit, errMsg: Error | null = null): Promise<Error | Response | null> => {
    try {
        const response = await fetch(url, optionsObj)
        if (!response.ok) throw Error('Please reload the app,something went wrong')
    } catch (error: any) {
        errMsg = error.message
    } finally {
        return errMsg
    }
}