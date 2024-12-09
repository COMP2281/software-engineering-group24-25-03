import { useSelector } from 'react-redux'


export default function Home() {
    const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <div>
        <h1>{accessToken}</h1>
    </div>
  )
}
