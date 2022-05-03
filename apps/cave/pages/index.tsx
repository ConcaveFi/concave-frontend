export const getServerSideProps = async () => {
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
