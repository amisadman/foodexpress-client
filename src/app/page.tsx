import { Button } from "@/components/ui/button";
import Image from "next/image";
import Icon from "./icon.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>
        <Image src={Icon} alt="logo" width={600} height={600} />
      </div>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
