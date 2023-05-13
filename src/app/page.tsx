import Image from 'next/image'

const Home = () => (
  <main className="">
    <div>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
    </div>
  </main>
)

export default Home
