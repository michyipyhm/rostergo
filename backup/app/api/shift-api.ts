const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export async function getShiftList(): Promise<any> {
    try {
      const res = await fetch(apiUrl + '/api/mobileShiftList', {
        method: 'GET',
      })
      
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = (await res.json()).data
      // console.log("data: ", data)
      return data
    } catch (error) {
      console.error('Error sending OTP:', error)
      throw error
    }
  }
  
