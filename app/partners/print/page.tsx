import CreatePrintNFT from "@/components/createPrint/createPrint"

const CreatePrintPage = async() => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 min-h-screen ">
      <h2>Welcome To Tickets Creation</h2>
      <CreatePrintNFT />
    </div>
  );
}

export default CreatePrintPage