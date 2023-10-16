import ErrorMessage from "@/components/common/error";

const ErrorPage = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-10">
      <ErrorMessage />
    </section>
  );
}

export default ErrorPage