import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex justify-center items-center flex-col text-primary">
      <Image
        src="/dribbble_1.gif"
        width={0}
        height={400}
        alt="404 not found"
        sizes="100vw"
        className="w-auto h-[400px]"
      />
      <div className="flex flex-col items-center justify-center py-5">
        <h2 className="text-2xl font-bold">Oops, page not found!</h2>
        <p className="text-center">
          The page you are looking for is not available.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
