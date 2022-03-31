import { useContext } from "react"
import { appContext } from "../../AppContext"
import { api } from "../../api/api"
import { ApiError } from "../../generated"

export const useApi = () => {
  const appStore = useContext(appContext)

  const wrapApiCall = async <T>(apiCall: Promise<T>) => {
    try {
      return await apiCall
    } catch (e) {
      if (e instanceof ApiError) {
        appStore.setErrorMessage(e.message)
      }
      throw e
    }
  }

  return {
    wrapApiCall,
    ...api,
  }
}
