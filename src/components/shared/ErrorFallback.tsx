import { Link } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <section className="flex min-h-screen items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>Oops..
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, Something Went Wrong.</p>
          <pre>{error.message}</pre>
          <p className="mb-8 mt-4 dark:text-gray-600">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <Link rel="noopener noreferrer" to="/" className={cn(buttonVariants({ variant: "secondary"}))}>
              Back to homepage
            </Link>
            <Button onClick={resetErrorBoundary}>Try Reset</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorFallback;
