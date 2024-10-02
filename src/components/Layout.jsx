import Navbar from "./Navbar";

export default function Layout({ children, search, handleSearchChange }) {
  return (
    <>
      <Navbar 
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <div className="pt-20 px-4">
        {children}
      </div>
    </>
  )
}