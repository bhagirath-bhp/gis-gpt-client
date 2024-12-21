import { Card, IconButton } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { MdAutoGraph } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { PiShippingContainer, PiTruckTrailer, PiFarm } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CgOrganisation } from "react-icons/cg";


export function Sidebar() {
  return (
    <Card className="z-[100] h-full p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-gray-100 rounded-none">
      <div className="flex flex-col justify-between h-full">
        <div className="start flex flex-col gap-5">
          <Link to="/dashboard">
            <IconButton color="white">
              <MdAutoGraph className="h-5 w-5" />
            </IconButton>
          </Link>
          <Link to="/map">
            <IconButton color="white">
              <LiaMapMarkedAltSolid className="h-5 w-5" />
            </IconButton>
          </Link>
          <Link to="/farmers">
            <IconButton color="white">
              <GiFarmer className="h-5 w-5" />
            </IconButton>
          </Link>
          <Link to="/farms">
            <IconButton color="white">
              <PiFarm className="h-5 w-5" />
            </IconButton>
          </Link>
          <Link to="/organizations">
            <IconButton color="white">
              <CgOrganisation className="h-5 w-5" />
            </IconButton>
          </Link>
        </div>
        <div className="end flex flex-col gap-5">
          <IconButton color="white">
            <PowerIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
