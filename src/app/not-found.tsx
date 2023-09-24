import Link from 'next/link'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-3xl font-bold mb-4">Not Found</h2>
    <p className="mb-4">Could not find the requested resource</p>
    <a className="btn btn-primary"><Link href="/">Go Home</Link></a>
  </div>
)

export default NotFound
