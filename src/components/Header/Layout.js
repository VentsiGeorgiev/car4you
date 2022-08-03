import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className='container'>{children}</main>
    </>
  )
}

export default Layout