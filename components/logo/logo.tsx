import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center justify-center gap-x-2'>
      <Image src='./logo.svg' alt='Blockito Logo' width={40} height={40} />
      <p className='text-xl font-bold'>
        <span className='text-gray-800'>Block</span>
        <span className='text-green-600'>IO</span>
      </p>
    </Link>
  )
}

export default Logo
