export const getServerSideProps = async (ctx) => {
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
