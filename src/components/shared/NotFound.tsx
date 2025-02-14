import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const NotFound = () => {
  return (
    <section className="flex items-center min-h-screen p-16 bg-background dark:bg-background dark:text-gray-500">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className={cn(buttonVariants())}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
