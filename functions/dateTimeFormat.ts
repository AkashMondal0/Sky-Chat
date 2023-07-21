const dateFormat = (date: string) => {

    return new Date(date).toLocaleDateString("en-US",
      { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', })
  }
  
  const timeFormat = (date: string) => {
    const time = new Date(date).toLocaleTimeString("en-US",
      {
        hour: "2-digit",
        minute: "2-digit"
      })
    return time
  }


export {
    dateFormat,
    timeFormat
}