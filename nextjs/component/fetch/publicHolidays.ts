export async function publicHolidays() {
    try {
      const response = await fetch('https://www.1823.gov.hk/common/ical/en.json', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch public holidays");
      }
  
      const data = await response.json();
  
      return data.map((event: { summary: string, start: string, end: string }) => ({
        title: event.summary,
        start: event.start,
        end: event.end
      }));
  
    } catch (error) {
      return [];
    }
  }