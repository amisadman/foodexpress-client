import { Button } from "@/components/ui/button";
import Image from "next/image";
import Icon from "./../icon.png";
import { UserService } from "@/services/user.service";

export default async function Home() {
  const session = await UserService.getSession();
  console.log(session);
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
