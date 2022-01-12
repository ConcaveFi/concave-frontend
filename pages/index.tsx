export const getServerSideProps = async (ctx: any) => {
  return {
    redirect: {
      destination: '/swap',
      permanent: false,
    },
  }
}

function Home() {
  return null
}

export default Home
