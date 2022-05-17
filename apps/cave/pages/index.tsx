export const getServerSideProps = async () => {
  // ! we can have as props th context ctx: any
  return {
    redirect: {
      destination: '/gemswap',
      permanent: false,
    },
  }
}

function Home() {
  return null
}

export default Home
