import { Loader2 } from "lucide-react"

const LoadingScreen = ({ message } : { message: string}) => {
  return (
    <div>
        <Loader2  className="text-primary animate-spin" size={30} />
        <h2>{message}</h2>
    </div>
  )
}

export default LoadingScreen