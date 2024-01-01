import {
  Card,
  CardHeader,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { MapPin } from "lucide-react";

export const PetOwner = ({ user }) => {
  return (
    <div className="pet-owner p-5 rounded-2xl border bg-white">
      <h3>Pet Owner info</h3>
      <Card className="max-w-[340px] shadow-none">
        <CardHeader className="justify-between pl-1 pr-0 pb-0">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              className="w-[40px] h-[40px] uppercase"
              name={user.username}
            />
            <div className="flex flex-col gap-1 items-start justify-center w-[calc(100%-60px)]">
              <h4 className="text-small font-semibold leading-none text-default-600 capitalize">
                {user.username}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                <p>{user.bio}</p>

                <Chip
                  startContent={<MapPin size={18} />}
                  variant="flat"
                  color="secondary"
                  className="mt-2 capitalize"
                  size="sm"
                >
                  {user.domicile}
                </Chip>
              </h5>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
